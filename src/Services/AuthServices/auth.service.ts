import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    // Check if the user is an admin by decoding the JWT token
    isAdmin(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            return decodedToken.roles.includes('ADMIN'); // Assuming roles is an array in the token
        }
        return false;
    }

        // Check if the user has the 'USER' role
        isUser(): boolean {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken: any = jwtDecode(token);
                return decodedToken.roles && decodedToken.roles.includes('USER'); // Check for the 'USER' role
            }
            return false;
        }
    
        // Optional: You can add an isAuthenticated() method to check if the user is logged in
        isAuthenticated(): boolean {
            const token = localStorage.getItem('token');
            return !!token; // Return true if token exists
        }

   
}
