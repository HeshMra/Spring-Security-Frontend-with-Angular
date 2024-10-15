import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiConfig } from '../../Enviroment/api.config';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiURL: string = ApiConfig.apiURL;

  constructor(private http: HttpClient) { }

  //save inquiry details
  saveInquiryDetails(inquiry: any, options: { headers: HttpHeaders }): Observable<any> {
    const url = `${this.apiURL}/api/v1/inquiry/save`;
    return this.http.post<any>(url, inquiry, options)
  }

  //get admin account details
  getAdminDetails(options: { responseType: 'text', headers: HttpHeaders }): Observable<any> {
    const url = `${this.apiURL}/api/v1/account/my-account`;
    return this.http.get(url, { headers: options.headers, responseType: options.responseType });
  }

}
