import {Component, OnInit} from '@angular/core';
import {PostsService} from "./services/posts.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  displayedColumns: string[] = ['authorName', 'body'];

  constructor(public postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postsService.loadPosts().subscribe()
  }

}
