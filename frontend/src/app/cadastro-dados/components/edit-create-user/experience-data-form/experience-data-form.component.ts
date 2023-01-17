import { Experience } from '../../../models/experience.model';
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
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

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
  @Input() expFormTitle!: string;
  @Input() experienceData!: Experience;

  constructor() {}

  ngOnInit(): void {
    this.buildExperienceForm(this.experienceData);
  }

  public buildExperienceForm(experience?: Experience): void {
    this.experienceForm = new FormGroup({
      userId: new FormControl(experience?.userId),
      experienceId: new FormControl(experience?.experienceId, [Validators.required]),
      experienceType: new FormControl(experience?.experienceType, [Validators.required]),
      title: new FormControl(experience?.title, [Validators.required]),
      initialDate: new FormControl(experience?.initialDate, [Validators.required]),
      finalDate: new FormControl(experience?.finalDate, [Validators.required]),
      expDescription: new FormControl(experience?.expDescription, [Validators.required]),
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
