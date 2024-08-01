import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './routes/home/home.component';
import { AdminDashboardComponent } from './routes/admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './routes/client-dashboard/client-dashboard.component';
import { LoginComponent } from './routes/login/login.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLinkActive,
     RouterLink,
      RouterOutlet,
       NavbarComponent
      ],
  providers: [HomeComponent, AdminDashboardComponent, ClientDashboardComponent, LoginComponent, SignUpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'standaloneComponent';
}
