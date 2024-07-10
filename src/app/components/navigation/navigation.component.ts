import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatTabLink, MatTabNav, MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    MatTabNav,
    MatTabLink,
    RouterLinkActive,
    MatTabsModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

}
