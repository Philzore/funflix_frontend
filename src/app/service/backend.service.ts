import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.development';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  // loginWithUsernameAndPassword(username: string, password: string) {
  //   const url = environment.baseUrl + "/login/";
  //   const body = {
  //     "username": username,
  //     "password": password
  //   };

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

  //   return lastValueFrom(this.http.post(url, body, { headers, withCredentials: false }));
  // }


  registerNewUser(username: string, password: string, email: string, firstName: string, lastName: string) {
    const url = environment.baseUrl + "/register/";
    const body = {
      "username": username,
      "password": password,
      "email": email,
      "firstName": firstName,
      "lastName": lastName,
    };
    return lastValueFrom(this.http.post(url, body));
  }
}
