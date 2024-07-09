import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PostsComponent} from "./posts/posts.component";
import {CustomersComponent} from "./customers/customers.component";
import {CustomerPostsComponent} from "./customer-posts/customer-posts.component";

export const routes: Routes = [{path: '', pathMatch: 'full', component: HomeComponent}, {
  path: 'customers',
  component: CustomersComponent
}, {path: 'posts', component: PostsComponent},
  {path: 'customer-posts/:customerId', component: CustomerPostsComponent}
];
