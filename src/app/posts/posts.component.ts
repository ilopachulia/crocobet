import {Component, inject, OnInit} from '@angular/core';
import {PostsService} from "./services/posts.service";
import {
  MatTableModule,
} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TruncatePipe} from "../pipes/truncate.pipe";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    TruncatePipe,
    MatDialogModule,
    ModalComponent
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  animations: [
    trigger('scaleAnimation', [
      state('small', style({ transform: 'scale(1)' })),
      state('large', style({ transform: 'scale(1.1)' })),
      transition('small <=> large', animate('200ms ease-in'))
    ])
  ]
})
export class PostsComponent implements OnInit {
  displayedColumns: string[] = ['authorName', 'body', 'actions'];
  buttonStates: { [id: string]: string } = {};
  readonly dialog = inject(MatDialog);
  isModalOpen: boolean = false

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.loadPosts().subscribe();
  }

  openModal(id: string) {
    this.isModalOpen = true;
    this.postsService.loadPostById(id).subscribe(post => {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: {post: post},
      });


    });
  }

  onMouseEnter(id: string) {
    this.buttonStates[id] = 'large';
  }

  onMouseLeave(id: string) {
    this.buttonStates[id] = 'small';
  }
}
