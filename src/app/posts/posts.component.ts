import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "./services/posts.service";
import {MatTableModule,} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TruncatePipe} from "../pipes/truncate.pipe";
import {MatDialog, MatDialogModule,} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, TruncatePipe, MatDialogModule, ModalComponent, MatProgressSpinner],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  animations: [trigger('scaleAnimation', [state('small', style({transform: 'scale(1)'})), state('large', style({transform: 'scale(1.1)'})), transition('small <=> large', animate('200ms ease-in'))])]
})
export class PostsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['authorName', 'body', 'actions'];
  buttonStates: { [id: string]: string } = {};
  isLoading: boolean = false
  private destroy$: Subject<void> = new Subject<void>();


  constructor(public postsService: PostsService, public dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.postsService.loadPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.isLoading = false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openModal(id: string) {
    this.postsService.loadPostById(id).subscribe(post => {
      this.dialog.open(ModalComponent, {
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
