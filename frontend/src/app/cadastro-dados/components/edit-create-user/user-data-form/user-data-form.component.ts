import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Role } from 'src/app/cadastro-dados/models/role.model';
import { State } from 'src/app/cadastro-dados/models/state.model';
import { UsersService } from 'src/app/cadastro-dados/services/users.service';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.css']
})
export class UserDataFormComponent implements OnInit {

  public states!: State[];
  public roles!: Role[];
  public userForm!: FormGroup;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getStates();
    this.getRoles();
    this.buildForm();
  }

  private buildForm(): void {
    this.userForm = new FormGroup({
      userId: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      profileImageUrl:new FormControl(null, [Validators.required]),
      userRole:new FormControl(null, [Validators.required]),
      password:new FormControl(null, [Validators.required]),
    });
  }

  private getStates(): void {
    this.states = this.usersService.getStatesOfBrazil();
  }

  private getRoles(): void {
    this.roles = this.usersService.listRoles();
  }

}
