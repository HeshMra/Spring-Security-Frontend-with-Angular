import { Component } from '@angular/core';
import { ApiConfig } from '../../Enviroment/api.config';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../Services/general services/common.service';

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './inquiry-form.component.html',
  styleUrl: './inquiry-form.component.scss'
})
export class InquiryFormComponent {

  constructor(private http: HttpClient, private router: Router, private commonservice: CommonService) { };

  private apiURL: string = ApiConfig.apiURL
  inquiry: any = {};


  onSubmit() {
    console.log("this inquiry details", this.inquiry)

    // Retrieve the JWT token from local storage or any other storage method
    const token = localStorage.getItem('token'); // Adjust according to your token storage method

    // Set the headers to include the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.commonservice.saveInquiryDetails(this.inquiry, { headers })
      .subscribe(
        (response) => {
          console.log('Inquiry saved successfully:', response);
          // You can display a success message or redirect
        },
        (error) => {
          console.error('Error saving inquiry:', error);
          // You can display an error message
        }
      );

  }

}
