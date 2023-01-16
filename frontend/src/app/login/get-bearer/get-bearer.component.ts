import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/cadastro-dados/models/user.model';
import { UsersService } from 'src/app/cadastro-dados/services/users.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-get-bearer',
  templateUrl: './get-bearer.component.html',
  styleUrls: ['./get-bearer.component.css']
})
export class GetBearerComponent implements OnInit {
  public get usersService(): UsersService {
    return this._usersService;
  }
  public set usersService(value: UsersService) {
    this._usersService = value;
  }

  public form!: FormGroup;
  public userId!: number;
  public users!: User[];


  constructor(
    private loginService: LoginService,
    private _usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
    this.buildForm();
  }


  private buildForm(): void {
    this.form = new FormGroup({
      loginId: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  public getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res) => this.users = res,
      error: (err) => console.log('Erro na listagem de usuários: ', err),
    })
  }

  public onSubmit(): void {

    const userPassword = this.form.getRawValue();

    this.users.map(user => {
      console.log(this.form);
      //if (user.name === userPassword.
    })



    /*if (userPassword) {
      this.loginService.getToken(userPassword.password)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        });
    } else {
      this.usersService.saveUser(user)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        });
    }

    this.form.reset();
    this.router.navigate(['/users']);
  }*/
}

}
