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
   posts$ = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient, private customersService: CustomersService) {
  }

   loadPosts(): Observable<Customer[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}posts`).pipe(
      switchMap(posts => {
        return this.customersService.getCustomers().pipe(
          tap(customers => {
            const postsWithAuthors = posts.map(post => {
              const author = customers.find(customer => customer.id === post.userId);
              return {
                ...post,
                authorName: author ? `${author.name} ${author.surname}` : 'Unknown Author'
              };
            });
            console.log(postsWithAuthors)
            this.posts$.next(postsWithAuthors);
          })
        );
      })
    );
  }

  getPosts() {
    return this.posts$.getValue()
  }
}
