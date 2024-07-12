import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeUntil, tap} from "rxjs/operators";
import {PostsService} from "../../shared/services/posts.service";
import {Subject} from "rxjs";
import {AsyncPipe,} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-customer-posts',
  standalone: true,
  imports: [AsyncPipe, MatCard, MatCardHeader, MatCardContent, MatCardTitle, MatProgressSpinner],
  templateUrl: './customer-posts.component.html',
  styleUrl: './customer-posts.component.css'
})
export class CustomerPostsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject()

  constructor(private route: ActivatedRoute, protected postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postsService.isLoading = true;
    this.route.params.pipe(takeUntil(this.destroy$), tap((params) => {
      this.postsService.loadPostsByCustomer(params['customerId']).subscribe();
    })).subscribe(() => this.postsService.isLoading = false);
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
