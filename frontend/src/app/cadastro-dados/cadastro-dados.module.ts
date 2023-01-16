import { CadastroDadosRoutingModule } from './cadastro-dados-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import {  MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserListComponent } from './user-list/user-list.component';
import { CadastroDados } from './cadastro-dados.component';
import { EditCreateUserComponent } from './components/edit-create-user/edit-create-user.component';
import { UserDataFormComponent } from './components/edit-create-user/user-data-form/user-data-form.component';
import { ExperienceDataFormComponent } from './components/edit-create-user/experience-data-form/experience-data-form.component';
import { SkillDataFormComponent } from './components/edit-create-user/skill-data-form/skill-data-form.component';
import { SocialMediaFormComponent } from './components/edit-create-user/social-media-form/social-media-form.component';

const material = [
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule
];

@NgModule({
  declarations: [
    CadastroDados,
    UserListComponent,
    EditCreateUserComponent,
    UserDataFormComponent,
    SocialMediaFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CadastroDadosRoutingModule,
    material,
    ExperienceDataFormComponent,
    SkillDataFormComponent,
  ],
  providers: [provideNgxMask()]
})
export class CadastroDadosModule { }
