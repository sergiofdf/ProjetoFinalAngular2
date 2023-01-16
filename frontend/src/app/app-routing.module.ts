import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m=> m.LoginModule)
  },
  {
    path: 'cadastro-dados',
    loadChildren: () => import('./cadastro-dados/cadastro-dados.module').then(m=> m.CadastroDadosModule)
  },
  {
    path: 'curriculo',
    loadChildren: () => import('./curriculo/curriculo.module').then(m=> m.CurriculoModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    // component: NotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
