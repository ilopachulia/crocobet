import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Customer, CustomerResponse } from "../../pages/customers/types";
import {BASE_URL} from "../constants/base-url";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customers$ = new BehaviorSubject<Customer[]>([]);
  private allCustomers: Customer[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    this.isLoading = true;
    return this.http.get<CustomerResponse[]>(`${BASE_URL}users`).pipe(
      map(customers => customers.map(customer => {
        const name = customer.name.split(' ');
        const surname = name.length > 1 ? name.slice(1).join(' ') : '';

        return {
          id: customer.id,
          name: name[0],
          surname: surname,
          phoneNumber: customer.phone,
          email: customer.email,
          companyName: customer.company.name
        };
      })),
      tap(transformedCustomers => {
        if (transformedCustomers) {
          this.allCustomers = transformedCustomers;
          this.customers$.next(transformedCustomers);
          this.isLoading = false;
        }
      })
    );
  }

  get customers(){
    return this.customers$.getValue()
  }

  filterCustomers(searchValue: string): void {
    this.isLoading = true;
    const filteredCustomers = this.allCustomers.filter(customer =>
      customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.surname.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.customers$.next(filteredCustomers);
    this.isLoading = false
  }
}
