import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7241/Users');
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`https://localhost:7241/Users/${id}`);
  }
}
