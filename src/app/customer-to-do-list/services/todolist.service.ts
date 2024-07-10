import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {switchMap, tap, map} from "rxjs/operators";
import {Task} from "./types";
import {CustomersService} from "../../customers/services/customers.service";

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com/';
  customerTasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  isLoading$: BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private customersService: CustomersService) {
  }


  loadToDoListByCustomer(id: Task['userId']): Observable<Task[]> {
    this.isLoading$.next(true);
    return this.http.get<Task[]>(`${this.BASE_URL}todos?userId=${id}`).pipe(
      switchMap((tasks: Task[]) =>
        this.customersService.getCustomers().pipe(
          map(customers => {
            return tasks.map(task => {
              const author = customers.find(customer => customer.id === task.userId);
              return {
                ...task,
                authorName: author ? `${author.name} ${author.surname}` : 'Unknown Author'
              };
            });
          })
        )
      ),
      tap((tasksWithAuthors: Task[]) => {
        this.customerTasks = tasksWithAuthors;
        this.isLoading$.next(false);
      })
    );
  }

  set customerTasks(tasks: Task[]) {
    this.customerTasks$.next(tasks);
  }

  get customerTasks(): Task[] {
    return this.customerTasks$.getValue()
  }
}
