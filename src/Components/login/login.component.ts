import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConfig } from '../../Enviroment/api.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  private apiURL: string = ApiConfig.apiURL // Should be within the class

  constructor(private http: HttpClient, private router: Router) {}


  onLogin() {
    this.http.post(`${this.apiURL}/api/v1/user/login`, 
      { username: this.username, password: this.password }, 
      { responseType: 'text' }  // Specify the response type as text
    ).subscribe(
     
      (response: string) => {
        const token = response; // The token is now treated as plain text
        localStorage.setItem('token', token); // Store the JWT token
        this.router.navigate(['/Home']); // Redirect to home page
      },
      error => {
        console.error('Login error:', error); // Add this line for debugging
        this.errorMessage = 'Invalid username or password'; // Display a generic error message
      }
    );
  }
  
}
