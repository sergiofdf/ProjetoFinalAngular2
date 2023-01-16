import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  public getToken(id: number): Observable<string> {


    return this.http.get<string>(`https://localhost:7241/Token/${id}`);
  }
}
