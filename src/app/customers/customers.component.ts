import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {CustomersService} from "./services/customers.service";
import {AsyncPipe} from "@angular/common";
import {Router} from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Task} from "../customer-to-do-list/services/types";
import {TodolistService} from "../customer-to-do-list/services/todolist.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [ReactiveFormsModule, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCell, MatCellDef, AsyncPipe, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef, MatButton, MatIconModule, MatProgressSpinner, MatFormField, MatInput, MatLabel],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  animations: [trigger('scaleAnimation', [state('small', style({transform: 'scale(1)'})), state('large', style({transform: 'scale(1.1)'})), transition('small <=> large', animate('200ms ease-in'))])]
})

export class CustomersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'surname', 'phoneNumber', 'email', 'companyName', 'postActions', 'taskActions'];
  buttonStates: { [id: string]: string } = {};
  isLoading: boolean = false;
  destroy$: Subject<void> = new Subject<void>();


  constructor(public customersService: CustomersService, private todolistService: TodolistService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.customersService.getCustomers().pipe(takeUntil(this.destroy$))
      .subscribe(() => this.isLoading = false,)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateToPosts(customerId: string): void {
    void this.router.navigate(['/customer-posts', customerId],)
  }

  navigateToToDoList(customerId: string): void {
    void this.router.navigate(['/customer-todo-list', customerId],)
  }

  onTasksClicked(id: Task['userId']): void {
    this.todolistService.loadToDoListByCustomer(id).subscribe();
  }


  onMouseEnter(id: string) {
    this.buttonStates[id] = 'large';
  }

  onMouseLeave(id: string) {
    this.buttonStates[id] = 'small';
  }
}
