
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
  public errorMessage: boolean = false;


  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsersFull();
    this.buildForm();
  }


  private buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  public getUsersFull(): void {
    this.usersService.getUsersFull().subscribe({
      next: (res) => this.users = res,
      error: (err) => console.log('Erro na listagem de usuários: ', err),
    })
  }

  public onSubmit(): void {

    const userPassword = this.loginForm.getRawValue();
    console.log(userPassword);
    this.users.map(user => {
      console.log(user);
      if (userPassword.email === user.email && userPassword.password === user.password) {
        this.userId = Number(user.userId);
      } else {
        localStorage.removeItem('BEARER');
      }
    })

    if (this.userId) {
      this.loginService.getToken(this.userId)
        .subscribe(
          (responseData) => {
            this.userId = 0;
            this.loginForm.reset();
            localStorage.setItem('BEARER', responseData.token);
            localStorage.setItem('USER', JSON.stringify(responseData.user))
            this.router.navigate(['/cadastro-dados']);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.errorMessage = true;
    }
  }
}



