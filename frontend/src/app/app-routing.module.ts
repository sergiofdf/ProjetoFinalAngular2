import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    redirectTo: 'cadastro-dados',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'cadastro-dados',
    pathMatch: 'full'
    // component: NotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
