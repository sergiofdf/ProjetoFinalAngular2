import { GetBearerComponent } from './get-bearer/get-bearer.component';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    /*children: [
      {
        path: '',
        component: GetBearerComponent
      },
    ]*/
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
