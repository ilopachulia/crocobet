import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Post} from "../../pages/posts/types";
import {HttpClient} from "@angular/common/http";
import {switchMap, tap} from 'rxjs/operators';
import {CustomersService} from "./customers.service";
import {Customer} from "../../pages/customers/types";
import {BASE_URL} from "../constants/base-url";

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnDestroy {
  posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  customerPosts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  post$: BehaviorSubject<Post | null> = new BehaviorSubject<Post | null>(null);
  isLoading: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private customersService: CustomersService) {
  }

  get post(): Post | null {
    return this.post$.getValue()
  }

  set post(post: Post) {
    this.post$.next(post);
  }

  get customerPosts(): Post[] {
    return this.customerPosts$.getValue()
  }

  set customerPosts(posts: Post[]) {
    this.customerPosts$.next(posts);
  }

  get posts(): Post[] {
    return this.posts$.getValue()
  }

  set posts(posts: Post[]) {
    this.posts$.next(posts)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPosts(): Observable<Customer[]> {
    this.isLoading = true;
    return this.http.get<Post[]>(`${BASE_URL}posts`).pipe(switchMap(posts => {
      return this.customersService.getCustomers().pipe(tap(customers => {
        this.posts = posts.map(post => {
          const author = customers.find(customer => customer.id === post.userId);
          return {
            ...post, authorName: author ? `${author.name} ${author.surname}` : 'Unknown Author'
          };
        });
        this.isLoading = false;
      }));
    }));
  }


  loadPostsByCustomer(id: Post['userId']): Observable<Post[]> {
    this.isLoading = true;
    return this.http.get<Post[]>(`${BASE_URL}posts?userId=${id}`).pipe(tap((posts: Post[]) => {
      this.customerPosts = posts;
      this.isLoading = false;
    }));
  }


  loadPostById(id: string): Observable<Post> {
    this.isLoading = true;
    return this.http.get<Post>(`${BASE_URL}posts/${id}`).pipe(tap((post: Post) => {
      this.post = post;
      this.isLoading = false;
    }));
  }

}
