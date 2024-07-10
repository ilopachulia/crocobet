import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {NavigationComponent} from "../navigation/navigation.component";
import {CustomersService} from "../customers/services/customers.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, DatePipe, NavigationComponent, MatFormField, MatInput, ReactiveFormsModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currentDate: Date = new Date();
  isCustomersPage: boolean = false;
  searchValue: string = '';

  constructor(private customersService: CustomersService, private router: Router) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    this.router.events.subscribe(() => {
      this.isCustomersPage = this.router.url === '/customers';
    });
  }

  applyFilter(): void {
    this.customersService.filterCustomers(this.searchValue);
  }
}
