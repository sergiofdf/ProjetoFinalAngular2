import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './core/guards/is-authenticated.guard';

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
    path: 'curriculo/:id',
    canActivate: [IsAuthenticatedGuard],
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
