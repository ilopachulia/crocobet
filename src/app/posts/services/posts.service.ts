import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Post} from "../types";
import {HttpClient} from "@angular/common/http";
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {CustomersService} from "../../customers/services/customers.service";
import {Customer} from "../../customers/types";

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnDestroy {
  posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  customerPosts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  post$: BehaviorSubject<Post | null> = new BehaviorSubject<Post | null>(null);
  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com/';
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
    return this.http.get<Post[]>(`${this.BASE_URL}posts`).pipe(switchMap(posts => {
      return this.customersService.getCustomers().pipe(tap(customers => {
        this.posts = posts.map(post => {
          const author = customers.find(customer => customer.id === post.userId);
          return {
            ...post, authorName: author ? `${author.name} ${author.surname}` : 'Unknown Author'
          };
        });
      }), takeUntil(this.destroy$));
    }), takeUntil(this.destroy$));
  }


  loadPostsByCustomer(id: Post['userId']): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}posts?userId=${id}`).pipe(
      tap((posts: Post[]) => {
        this.customerPosts = posts;
      }),
      takeUntil(this.destroy$)
    );
  }
  loadPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.BASE_URL}posts/${id}`).pipe(tap((post: Post) => {
      this.post = post;
    }), takeUntil(this.destroy$))
  }
}
