import { LoginResponse } from './../models/login-response.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


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
}
