import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

export const routes: Routes = [{
    path:'',
    loadChildren: () => import('./views/admin/admin.routes').then(adminRoutes => adminRoutes.routes)
}];
