import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CadastroDadosRoutingModule } from '../cadastro-dados/cadastro-dados-routing.module';



@NgModule({
  declarations: [
    LoginComponent,

  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CadastroDadosRoutingModule,


  ],
  providers: [provideNgxMask()]
})
export class LoginModule { }
