import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Post} from "../types";
import {HttpClient} from "@angular/common/http";
import {switchMap, tap} from 'rxjs/operators';
import {CustomersService} from "../../customers/services/customers.service";
import {Customer} from "../../customers/types";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com/';
  posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  customerPosts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  post$: BehaviorSubject<Post | null> = new BehaviorSubject<Post | null>(null);


  constructor(private http: HttpClient, private customersService: CustomersService) {
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
      }));
    }));
  }

  loadPostsByCustomer(id: Post['userId']): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}posts?userId=${id}`).pipe(tap((posts: Post[]) => {
      this.customerPosts = posts
    }))
  }

  loadPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.BASE_URL}posts/${id}`).pipe(tap((post: Post) => {
      this.post = post;
    }))
  }



  set post(post: Post) {
    this.post$.next(post);
  }

  get post(): Post | null {
    return this.post$.getValue()
  }

  set customerPosts(posts: Post[]) {
    this.customerPosts$.next(posts);
  }

  get customerPosts(): Post[] {
    return this.customerPosts$.getValue()
  }

  set posts(posts: Post[]) {
    this.posts$.next(posts)
  }

  get posts(): Post[] {
    return this.posts$.getValue()
  }
}
