import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public users: User[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res) => this.users = res,
      error: (err) => console.log('Erro na listagem de usuários: ', err),
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

}
