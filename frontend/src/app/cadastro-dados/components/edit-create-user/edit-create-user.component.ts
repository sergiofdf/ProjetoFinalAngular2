import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-create-user',
  templateUrl: './edit-create-user.component.html',
  styleUrls: ['./edit-create-user.component.css']
})
export class EditCreateUserComponent implements OnInit  {

  public workExperiencesForms!: FormGroup[];
  public educationsExperienceForms!: FormGroup[];
  public skillsForms!: FormGroup[];
  public socialMedia!: FormGroup;
  public userId!: string;


  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.updateForm();
    }
  }

  public addWorkExperienceForm(): void{
  }

  private updateForm(): void {}



}
