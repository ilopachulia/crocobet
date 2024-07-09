import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeUntil, tap} from "rxjs/operators";
import {PostsService} from "../posts/services/posts.service";
import {Subject} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-customer-posts',
  standalone: true,
  imports: [AsyncPipe, MatCard, MatCardHeader, MatCardContent, MatCardTitle],
  templateUrl: './customer-posts.component.html',
  styleUrl: './customer-posts.component.css'
})
export class CustomerPostsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject()

  constructor(private route: ActivatedRoute, protected postsService: PostsService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$), tap((params) => {
      this.postsService.loadPostsByCustomer(params['customerId']).subscribe();
    })).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

}
