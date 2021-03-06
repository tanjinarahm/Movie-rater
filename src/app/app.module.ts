import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './nav/nav.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'movies'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    MainModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
