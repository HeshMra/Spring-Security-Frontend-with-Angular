import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,FormsModule,RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  role: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router) {}


  ngOnInit() {
    this.role = this.getRole(); // Get the role when the home component initializes
  }


  getRole(): string | null {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken.roles && decodedToken.roles.length > 0) {
        return decodedToken.roles[0]; // Return the user's role (e.g., "ADMIN" or "USER")
      }
    }
    return null;
  }

  goToAdmin() {
    if (this.role === 'ADMIN') {
      this.router.navigate(['/admin']); // Navigate to the admin component if role is "ADMIN"
    } else {
      this.errorMessage = 'Access denied. Admins only.';
    }
  }

  notice(){
    this.router.navigate(['/Test']); 
  }

  goToUser() {
    if (this.role === 'USER') {
      this.router.navigate(['/user']); // Navigate to the user component if role is "USER"
    } else {
      this.errorMessage = 'Access denied. Users only.';
    }
  }

  login() {
    this.router.navigate(['/login']); // Redirect to the login page
  }

  logout() {
    localStorage.removeItem('token'); // Remove the token from localStorage
    this.router.navigate(['/login']); // Redirect to the login page
  }

  addInquiry(){
    if (this.role === 'USER') {
      this.router.navigate(['/add_inquiry']); // Navigate to the inquiry component if role is "USER"
    } else {
      this.errorMessage = 'Access denied. Users only.';
    }
  }

}
