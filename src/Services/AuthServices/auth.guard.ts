import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const token = localStorage.getItem('token');
  
      if (token) {
        // Get the expected roles for the route from route data
        const expectedRoles: string[] = route.data['roles'];
  
        // Check if the user has the required role (either Admin or User)
        if (expectedRoles.includes('ADMIN') && this.authService.isAdmin()) {
          return true; // Allow access if user is an Admin
        } else if (expectedRoles.includes('USER') && this.authService.isUser()) {
          return true; // Allow access if user is a regular User
        }
      }
  
      // Redirect to the login page if the user is not allowed
      this.router.navigate(['/login']);
      return false;
    }
}
