import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/api/movies/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 95ca5317babe5a2fe4b4ecf33eeb70831aba1dc4'
  });
  // private movies = [
  //   'Terminator', 
  //   'Predator'
  // ];

  constructor(
    private httpClient: HttpClient
  ) { }

  getMovies() {
    return this.httpClient.get(this.baseUrl, {headers: this.headers});
    // console.log(dynamicMovies)
    // return this.movies;
  }

}
