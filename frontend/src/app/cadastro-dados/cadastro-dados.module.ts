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
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    material
  ],
  providers: [provideNgxMask()]
})
export class CadastroDadosModule { }
