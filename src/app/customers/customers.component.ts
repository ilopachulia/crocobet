import {Component, OnInit} from '@angular/core';
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
import {AsyncPipe, CommonModule} from "@angular/common";
import {Router} from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCell, MatCellDef, AsyncPipe, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef, MatButton, MatIconModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  animations: [
    trigger('scaleAnimation', [
      state('small', style({ transform: 'scale(1)' })),
      state('large', style({ transform: 'scale(1.1)' })),
      transition('small <=> large', animate('200ms ease-in'))
    ])
  ]
})

export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'phoneNumber', 'email', 'companyName', 'actions'];
  buttonStates: { [id: string]: string } = {};

  constructor(public customersService: CustomersService, private router: Router) {
  }

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe()
  }

  navigateToPosts(customerId: string): void {
    void this.router.navigate(['/customer-posts', customerId],)
  }

  onMouseEnter(id: string) {
    this.buttonStates[id] = 'large';
  }

  onMouseLeave(id: string) {
    this.buttonStates[id] = 'small';
  }
}
