import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
// path: '',
  // component: UsersComponent,
  // children: [
  //   {
  //     path: 'create',
  //     component: CreateUserComponent
  //   },
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
export class CadastroDadosRoutingModule { }
