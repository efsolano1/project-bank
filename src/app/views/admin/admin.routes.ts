import { Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { ContentComponent } from "../../layout/content/content.component";

import { UsersComponent } from "../users/users.component";
import { DashboardComponent } from "../../components/modules/dashboard/dashboard.component";
import { LoaderComponent } from "../../components/loader/loader.component";
import { AccountsComponent } from "../accounts/accounts.component";
import { TransactionsComponent } from "../transactions/transactions.component";

export const routes: Routes = [{
    path:'',
    component:LoginComponent
},
{
    path: 'app',
    component: ContentComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'accounts',
        component: AccountsComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
        {
          path:'',
          redirectTo:'dashboard',
          pathMatch:'full'
        }
    ]
  },
{
    path:'not-found',
    component:NotFoundComponent
},
{
    path:'**',
    redirectTo:'not-found'
}];