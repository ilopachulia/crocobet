import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap, tap, map, takeUntil } from 'rxjs/operators';
import { Task } from '../../pages/customer-to-do-list/types/types';
import { CustomersService } from './customers.service';
import {BASE_URL} from "../constants/base-url";

@Injectable({
  providedIn: 'root',
})
export class TodolistService implements OnDestroy {
  customerTasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  destroy$ = new Subject<void>();
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private customersService: CustomersService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadToDoListByCustomer(id: Task['userId']): Observable<Task[]> {
    this.isLoading = true;
    return this.http.get<Task[]>(`${BASE_URL}todos?userId=${id}`).pipe(
      switchMap((tasks: Task[]) =>
        this.customersService.getCustomers().pipe(
          map((customers) => {
            return tasks.map((task) => {
              const author = customers.find(
                (customer) => customer.id === task.userId
              );
              return {
                ...task,
                authorName: author
                  ? `${author.name} ${author.surname}`
                  : 'Unknown Author',
              };
            });
          })
        )
      ),
      tap((tasksWithAuthors: Task[]) => {
        this.customerTasks = tasksWithAuthors;
        this.isLoading = false;
      }),
      takeUntil(this.destroy$)
    );
  }

  set customerTasks(tasks: Task[]) {
    this.customerTasks$.next(tasks);
  }

  get customerTasks(): Task[] {
    return this.customerTasks$.getValue();
  }
}
