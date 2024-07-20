import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'home', loadComponent: () => import('./routes/home/home.component').then(mod => mod.HomeComponent)},
    {path: 'login', loadComponent: () => import('./routes/login/login.component').then(mod => mod.LoginComponent)},
    {path: 'admin', loadComponent: () => import('./routes/admin-dashboard/admin-dashboard.component').then(mod => mod.AdminDashboardComponent)},
    {path: 'client', loadComponent: () => import('./routes/client-dashboard/client-dashboard.component').then(mod => mod.ClientDashboardComponent)},
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
