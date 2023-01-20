import { EditCreateUserComponent } from './components/edit-create-user/edit-create-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CadastroDados } from './cadastro-dados.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '../core/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: CadastroDados,
    children: [
      {
        path: '',
        canActivate: [IsAuthenticatedGuard],
        component: UserListComponent
      },
      {
        path: 'create',
        component: EditCreateUserComponent
      },
      {
        path: 'edit/:id',
        canActivate: [IsAuthenticatedGuard],
        component: EditCreateUserComponent
      },
    ]
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
