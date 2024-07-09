import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {NavigationComponent} from "../navigation/navigation.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    NavigationComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currentDate: Date = new Date();

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
}
