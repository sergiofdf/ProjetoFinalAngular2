import { LoginModule } from './login/login.module';
import { CadastroDadosModule } from './cadastro-dados/cadastro-dados.module';
import { CurriculoModule } from './curriculo/curriculo.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CurriculoModule,
    CadastroDadosModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
