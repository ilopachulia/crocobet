import {Routes} from '@angular/router';
import {PostsComponent} from "./posts/posts.component";
import {CustomersComponent} from "./customers/customers.component";
import {CustomerPostsComponent} from "./customer-posts/customer-posts.component";

export const routes: Routes = [
  {path: '', redirectTo: "customers", pathMatch: 'full'},
  { path: 'customers', component: CustomersComponent },
  {path: 'posts', component: PostsComponent},
  {path: 'customer-posts/:customerId', component: CustomerPostsComponent}
];
