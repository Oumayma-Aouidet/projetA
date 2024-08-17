import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./routes/home/home.component').then(mod => mod.HomeComponent) },
    { path: 'login', loadComponent: () => import('./routes/login/login.component').then(mod => mod.LoginComponent) },
    { path: 'admin', loadComponent: () => import('./routes/admin-dashboard/admin-dashboard.component').then(mod => mod.AdminDashboardComponent) },
    { path: 'client', loadComponent: () => import('./routes/client-dashboard/client-dashboard.component').then(mod => mod.ClientDashboardComponent) },
    {
        path: 'compte', loadChildren: () => import('./component/comptes/compte.routes').then(r => r.COMPTE_ROUETS)
    },
    { path: 'virement', loadComponent: () => import('./routes/virement/virement.component').then(mod => mod.VirementComponent) },
    { path: 'sign-up', loadComponent: () => import('./routes/sign-up/sign-up.component').then(mod => mod.SignUpComponent) },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
