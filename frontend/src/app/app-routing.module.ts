import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => import('./login/login.module').then(m=> m.LoginModule)
  },
  {
    path: 'cadastro-dados',
    pathMatch: 'full',
    loadChildren: () => import('./cadastro-dados/cadastro-dados.module').then(m=> m.CadastroDadosModule)
  },
  {
    path: 'curriculo',
    pathMatch: 'full',
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
    pathMatch: 'full'
    // component: NotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
