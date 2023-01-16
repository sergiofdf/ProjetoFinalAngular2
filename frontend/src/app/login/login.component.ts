
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../cadastro-dados/models/user.model';
import { UsersService } from '../cadastro-dados/services/users.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // public get usersService(): UsersService {
  //   return this._usersService;
  // }
  // public set usersService(value: UsersService) {
  //   this._usersService = value;
  // }

  public loginForm!: FormGroup;
  public userId!: number;
  public users!: User[];


  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getUsers();
    this.buildForm();
  }


  private buildForm(): void {
    this.loginForm = new FormGroup({
      loginId: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  // public getUsers(): void {
  //   this.usersService.getUsers().subscribe({
  //     next: (res) => this.users = res,
  //     error: (err) => console.log('Erro na listagem de usuários: ', err),
  //   })
  // }

  public onSubmit(): void {

    const userPassword = this.loginForm.getRawValue();
    console.log(userPassword);
    this.users.map(user => {
      console.log(this.loginForm);
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



