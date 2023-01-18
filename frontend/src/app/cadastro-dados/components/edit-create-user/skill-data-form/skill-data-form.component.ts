import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Skill } from 'src/app/cadastro-dados/models/skill.model';
import { EditCreateUserComponent } from '../edit-create-user.component';

@Component({
  selector: 'app-skill-data-form',
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
  templateUrl: './skill-data-form.component.html',
  styleUrls: ['./skill-data-form.component.css']
})
export class SkillDataFormComponent implements OnInit {
  public skillForm!: FormGroup;
  public skillTypes = ['Idioma', 'Técnica'];
  @Input() skillId!: number;
  @Input() parentRef!: EditCreateUserComponent;
  @Input() skillData!: Skill;

  constructor(
  ) { }

  ngOnInit(): void {
    this.buildSkillForm(this.skillData);
  }


  private buildSkillForm(skill?: Skill): void {
    this.skillForm = new FormGroup({
      userId: new FormControl(skill?.userId),
      skillId: new FormControl(skill?.skillId, [Validators.required]),
      skillType: new FormControl(skill?.skillType, [Validators.required]),
      title: new FormControl(skill?.title, [Validators.required]),
      progressLevel: new FormControl(skill?.progressLevel, [Validators.required]),
    });
  }

  public removeMe(): void {
    this.parentRef.removeSkillForm(this.skillId);
  }
}
