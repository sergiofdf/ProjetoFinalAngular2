import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private http: HttpClient) { }


  public getToken(id: number): Observable<string> {


    return this.http.get<string>('http://localhost:7421/Token?id=' + id);
  }
}
