import {Component, OnInit} from '@angular/core';
import {TodolistService} from "../../shared/services/todolist.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-customer-to-do-list',
  standalone: true,
    imports: [
        MatTable,
        MatHeaderCell,
        MatColumnDef,
        MatHeaderCellDef,
        MatCellDef,
        MatCell,
        MatButton,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRowDef,
        MatRow,
        MatProgressSpinner
    ],
  templateUrl: './customer-to-do-list.component.html',
  styleUrl: './customer-to-do-list.component.css',
  animations: [
    trigger('scaleAnimation', [
      state('small', style({ transform: 'scale(1)' })),
      state('large', style({ transform: 'scale(1.1)' })),
      transition('small <=> large', animate('200ms ease-in'))
    ])
  ]
})
export class CustomerToDoListComponent {
  displayedColumns: string[] = ['authorName', 'title', 'completed'];
  
  constructor(public todolistService: TodolistService ) { }

}