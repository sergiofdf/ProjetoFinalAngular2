import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { DialogComponent } from '../dialog/dialog.component';

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
    private router: Router, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res) => this.users = res,
      error: (err) => console.log('Erro na listagem de usuários: ', err),
    })
  }

  public deleteUser(id: string): void {
    this.usersService.deleteUser(id).subscribe({
      error: (err) => console.log('Erro na listagem de usuários: ', err),
      complete: () => this.getUsers()
    })
  }

  public openDialog(enterAnimationDuration: string,
    exitAnimationDuration: string,
    user: User
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '330px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        text: `Tem certeza que deseja excluir o usuário ${user.name}?`,
        button1: 'Sim',
        button2: 'Cancelar'
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data === 'delete') {
        this.deleteUser(user.userId);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

}
