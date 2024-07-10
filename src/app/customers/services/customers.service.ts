import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Customer, CustomerResponse } from "../types";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com/';

  customers$ = new BehaviorSubject<Customer[]>([]);
  private allCustomers: Customer[] = [];

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<CustomerResponse[]>(`${this.BASE_URL}users`).pipe(
      map(customers => customers.map(customer => {
        const name = customer.name.split(' ');
        const surname = name.length > 1 ? name.slice(1).join(' ') : '';

        return {
          id: customer.id,
          name: name[0],
          surname: surname,
          phoneNumber: customer.phone, // Ensure phoneNumber is typed as string
          email: customer.email,
          companyName: customer.company.name
        };
      })),
      tap(transformedCustomers => {
        if (transformedCustomers) {
          this.allCustomers = transformedCustomers;
          this.customers$.next(transformedCustomers);
        }
      })
    );
  }

  get customers(){
    return this.customers$.getValue()
  }

  filterCustomers(searchValue: string): void {
    const filteredCustomers = this.allCustomers.filter(customer =>
      customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.surname.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.customers$.next(filteredCustomers);
  }
}
