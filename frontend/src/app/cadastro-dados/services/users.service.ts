import { UserComplete } from './../models/userComplete.model';
import { Experience } from '../../cadastro-dados/models/experience.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { State } from '../models/state.model';
import { User } from '../models/user.model';
import { Skill } from '../models/skill.model';
import { SocialMedia } from '../models/social-media.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUserCompleteById(id: string): Observable<UserComplete> {
    return this.http.get<UserComplete>(`https://localhost:7241/UserCompleteInfo/${id}/id`);
  }

  public getUsersFull(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7241/Users-full');
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7241/Users');
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`https://localhost:7241/User/${id}/id`);
  }

  public getExperiencesByUserId(id: string): Observable<Experience[]> {
    return this.http.get<Experience[]>(`https://localhost:7241/experiences/${id}/id`);
  }

  public getSkillsByUserId(id: string): Observable<Skill[]> {
    return this.http.get<Skill[]>(`https://localhost:7241/Skills/${id}/id`);
  }

  public getSocialMediaByUserId(id: string): Observable<SocialMedia> {
    return this.http.get<SocialMedia>(`https://localhost:7241/socialmediainfos/${id}/id`);
  }

  public createUser(user: any): Observable<any> {
    return this.http.post<any>('https://localhost:7241/User', user);
  }

  public createExperience(experience: Experience): Observable<any> {
    return this.http.post<any>(`https://localhost:7241/experience`, experience);
  }

  public updateUserById(user: User): Observable<any> {
    return this.http.put<any>(`https://localhost:7241/User/${user.userId}`, user);
  }

  public updateExperiencesByUserId(experience: Experience): Observable<any> {
    // const experienceBody: any = experience;
    // delete experienceBody.experienceId
    // console.log(experienceBody);

    return this.http.put<any>(`https://localhost:7241/experience/${experience.experienceId}`, experience);
  }

  public createSkill(skill: Skill): Observable<any> {
    return this.http.post<any>(`https://localhost:7241/Skill`, skill);
  }

  public updateSkillsByUserId(skill: Skill): Observable<any> {
    return this.http.put<any>(`https://localhost:7241/Skill/${skill.skillId}`, skill);
  }

  public createSocialMediaByUserId(socialMedia: SocialMedia): Observable<any> {
    return this.http.post<any>(`https://localhost:7241/socialmediainfos`, socialMedia);
  }

  public updateSocialMediaByUserId(socialMedia: SocialMedia): Observable<any> {
    return this.http.put<any>(`https://localhost:7241/socialmediainfos/${socialMedia.socialMediaInfoId}`, socialMedia);
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`https://localhost:7241/User/${id}`);
  }

  public deleteExperience(id: string): Observable<any> {
    return this.http.delete<any>(`https://localhost:7241/experience/${id}`);
  }

  public deleteSkill(id: string): Observable<any> {
    return this.http.delete<any>(`https://localhost:7241/Skill/${id}`);
  }

  public getStatesOfBrazil(): State[] {
    return (
      [
        { name: 'Acre', abbr: 'AC' },
        { name: 'Alagoas', abbr: 'AL' },
        { name: 'Amap??', abbr: 'AP' },
        { name: 'Amazonas', abbr: 'AM' },
        { name: 'Bahia', abbr: 'BA' },
        { name: 'Cear??', abbr: 'CE' },
        { name: 'Distrito Federal', abbr: 'DF' },
        { name: 'Esp??rito Santo', abbr: 'ES' },
        { name: 'Goi??s', abbr: 'GO' },
        { name: 'Maranh??o', abbr: 'MA' },
        { name: 'Mato Grosso', abbr: 'MT' },
        { name: 'Mato Grosso do Sul', abbr: 'MS' },
        { name: 'Minas Gerais', abbr: 'MG' },
        { name: 'Par??', abbr: 'PA' },
        { name: 'Para??ba', abbr: 'PB' },
        { name: 'Paran??', abbr: 'PR' },
        { name: 'Pernambuco', abbr: 'PE' },
        { name: 'Piau??', abbr: 'PI' },
        { name: 'Rio de Janeiro', abbr: 'RJ' },
        { name: 'Rio Grande do Norte', abbr: 'RN' },
        { name: 'Rio Grande do Sul', abbr: 'RS' },
        { name: 'Rond??nia', abbr: 'RO' },
        { name: 'Roraima', abbr: 'RR' },
        { name: 'Santa Catarina', abbr: 'SC' },
        { name: 'S??o Paulo', abbr: 'SP' },
        { name: 'Sergipe', abbr: 'SE' },
        { name: 'Tocantins', abbr: 'TO' }
      ]
    );
  }

  public listRoles(): Role[] {
    return (
      [
        { roleName: 'Admin' },
        { roleName: 'Usu??rio' },
        { roleName: 'Visitante' }
      ]
    );
  }
}
