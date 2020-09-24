import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms'


import {ApiService } from '../api.service'

import { MainComponent } from './main.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from '../auth/auth.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path:'movies', component: MainComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieFormComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ]
})
export class MainModule { }