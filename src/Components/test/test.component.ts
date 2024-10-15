import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../Services/general services/common.service';
import { ApiConfig } from '../../Enviroment/api.config';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  private apiURL: string = ApiConfig.apiURL 
  noticedetails: any = {};


  constructor(private router: Router, private commonservice: CommonService,private http: HttpClient) { }

  ngOnInit() {
    this.getNoticeData();
  }

  // getNoticeData() {
  //   alert("hello")
  //   this.commonservice.getNoticeDetails()
  //     .subscribe(
  //       (data: any) => {  // Since the backend returns a string, just assign it directly
  //         this.noticedetails = data;  // No need for data.body[0]
  //         console.log('Admin details:', this.noticedetails); // Log the plain string response
  //       },
  //       (error: any) => {  
  //         console.error('Error fetching data:', error); // Handle error
  //       }
  //     );
  //  }

  getNoticeData() {
    // Make the HTTP GET request to the backend
    this.http.get(`${this.apiURL}/api/v1/notice/my-notice`, { responseType: 'text' }).subscribe({
      next: (response: string) => {
        console.log(response); // Log the response to the console
        this.noticedetails = response; // Optionally, store the response in a variable
      },
      error: (error) => {
        console.error('Error fetching account details:', error); // Handle error case
      }
    });
  }
}
