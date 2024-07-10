import {Component, OnInit} from '@angular/core';
import {PostsService} from "../posts/services/posts.service";
import {TodolistService} from "./services/todolist.service";

@Component({
  selector: 'app-customer-to-do-list',
  standalone: true,
  imports: [],
  templateUrl: './customer-to-do-list.component.html',
  styleUrl: './customer-to-do-list.component.css'
})
export class CustomerToDoListComponent implements OnInit{
  constructor(public todolistService: TodolistService) { }

  ngOnInit(): void {
    // this.todolistService.loadToDoList().subscribe();
  }

}
