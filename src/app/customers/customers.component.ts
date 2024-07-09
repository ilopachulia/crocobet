import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {CustomersService} from "./services/customers.service";
import {Customer} from "./types";
import {AsyncPipe} from "@angular/common";



@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCell, MatCellDef, AsyncPipe, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})

export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'phoneNumber', 'email', 'companyName'];

  constructor(public customersService: CustomersService) {
  }

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe()
  }
}
