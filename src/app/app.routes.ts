import {Routes} from '@angular/router';
import {PostsComponent} from "./pages/posts/posts.component";
import {CustomersComponent} from "./pages/customers/customers.component";
import {CustomerPostsComponent} from "./pages/customer-posts/customer-posts.component";
import {CustomerToDoListComponent} from "./pages/customer-to-do-list/customer-to-do-list.component";

export const routes: Routes = [
  {path: '', redirectTo: "customers", pathMatch: 'full'},
  { path: 'customers', component: CustomersComponent },
  {path: 'posts', component: PostsComponent},
  {path: 'customer-posts/:customerId', component: CustomerPostsComponent},
  {path: 'customer-todo-list/:customerId', component: CustomerToDoListComponent}
];
