import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { State } from '../models/state.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsersFull(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7241/Users-full');
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7241/Users');
  }

  public createUser(user: any): Observable<any>{
    return this.http.post<any>('https://localhost:7241/User', user);
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`https://localhost:7241/User/${id}`);
  }

  public getStatesOfBrazil(): State[] {
    return (
      [
        { name: 'Acre', abbr: 'AC' },
        { name: 'Alagoas', abbr: 'AL' },
        { name: 'Amapá', abbr: 'AP' },
        { name: 'Amazonas', abbr: 'AM' },
        { name: 'Bahia', abbr: 'BA' },
        { name: 'Ceará', abbr: 'CE' },
        { name: 'Distrito Federal', abbr: 'DF' },
        { name: 'Espírito Santo', abbr: 'ES' },
        { name: 'Goiás', abbr: 'GO' },
        { name: 'Maranhão', abbr: 'MA' },
        { name: 'Mato Grosso', abbr: 'MT' },
        { name: 'Mato Grosso do Sul', abbr: 'MS' },
        { name: 'Minas Gerais', abbr: 'MG' },
        { name: 'Pará', abbr: 'PA' },
        { name: 'Paraíba', abbr: 'PB' },
        { name: 'Paraná', abbr: 'PR' },
        { name: 'Pernambuco', abbr: 'PE' },
        { name: 'Piauí', abbr: 'PI' },
        { name: 'Rio de Janeiro', abbr: 'RJ' },
        { name: 'Rio Grande do Norte', abbr: 'RN' },
        { name: 'Rio Grande do Sul', abbr: 'RS' },
        { name: 'Rondônia', abbr: 'RO' },
        { name: 'Roraima', abbr: 'RR' },
        { name: 'Santa Catarina', abbr: 'SC' },
        { name: 'São Paulo', abbr: 'SP' },
        { name: 'Sergipe', abbr: 'SE' },
        { name: 'Tocantins', abbr: 'TO' }
      ]
    );
  }

  public listRoles(): Role[] {
    return (
      [
        {roleName: 'Admin'},
        {roleName: 'Usuário'},
        {roleName: 'Visitante'}
      ]
    );
  }
}
