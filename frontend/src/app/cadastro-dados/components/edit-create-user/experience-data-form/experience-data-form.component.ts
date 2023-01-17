import { EditCreateUserComponent } from './../edit-create-user.component';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { UsersService } from 'src/app/cadastro-dados/services/users.service';

@Component({
  selector: 'app-experience-data-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './experience-data-form.component.html',
  styleUrls: ['./experience-data-form.component.css'],
})
export class ExperienceDataFormComponent implements OnInit {
  public experienceForm!: FormGroup;
  @Input() experienceType: string = 'Experiência Profissional';
  @Input() expId!: number;
  @Input() parentRef!: EditCreateUserComponent;

  constructor() {}

  ngOnInit(): void {
    this.buildExperienceForm();
  }

  private buildExperienceForm(): void {
    this.experienceForm = new FormGroup({
      userId: new FormControl(),
      experienceId: new FormControl(null, [Validators.required]),
      experienceType: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      initialDate: new FormControl(null, [Validators.required]),
      finalDate: new FormControl(null, [Validators.required]),
      expDescription: new FormControl(null, [Validators.required]),
    });
  }

  public removeMe(): void {
    if(this.experienceType === 'Experiência Profissional'){
      this.parentRef.removeWorkExperienceForm(this.expId);
    }
    else{
      this.parentRef.removeEducationExperienceForm(this.expId);
    }

  }
}
