import { LoginResponse } from './../models/login-response.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }


  public getToken(id: number): Observable<string> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
      }),
      params: new HttpParams().set("id", id)
    };

    return this.http.get<string>(`https://localhost:7241/Token/${id}`, headers)
  }

  public logout(): void {
    localStorage.removeItem('USER');
    localStorage.removeItem('BEARER');
    this.router.navigate(['/login']);
  }
}
