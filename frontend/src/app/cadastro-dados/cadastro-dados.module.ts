import { NgxSpinnerModule } from 'ngx-spinner';
import { CadastroDadosRoutingModule } from './cadastro-dados-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserListComponent } from './components/user-list/user-list.component';
import { CadastroDados } from './cadastro-dados.component';
import { EditCreateUserComponent } from './components/edit-create-user/edit-create-user.component';
import { UserDataFormComponent } from './components/edit-create-user/user-data-form/user-data-form.component';
import { ExperienceDataFormComponent } from './components/edit-create-user/experience-data-form/experience-data-form.component';
import { SkillDataFormComponent } from './components/edit-create-user/skill-data-form/skill-data-form.component';
import { SocialMediaFormComponent } from './components/edit-create-user/social-media-form/social-media-form.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

const material = [
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
];

@NgModule({
  declarations: [
    CadastroDados,
    UserListComponent,
    EditCreateUserComponent,
    UserDataFormComponent,
    SocialMediaFormComponent,
    DialogComponent,
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
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideNgxMask()]
})
export class CadastroDadosModule { }
