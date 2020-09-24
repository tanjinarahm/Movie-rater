import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../models/Movie';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public movies: Movie[] = [];
  public selectedMovie: Movie = null;
  public editedMovie: Movie = null;
  public home: boolean = true;
  public isLoggedIn: boolean = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token');
    console.log(mrToken);
    if(!mrToken) {
      // this.router.navigate(['/auth'])
      this.getAllMovies();
    } else {
      this.getAuthMovies();
      this.isLoggedIn = true;
        // this.apiService.getMovies().subscribe(
        //   (data: Movie[]) => {
        //     this.movies = data;
        //   },
        //   error => console.log(error)
        // );
    }
  }

  getAllMovies() {
    let observable = this.apiService.getMovies();
    observable.subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  //
  getAuthMovies() {
    let observable = this.apiService.getAuthMovies();
    observable.subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  selectMovie(movie: Movie){
    this.editedMovie = null;
    this.selectedMovie = movie;
    this.home = false;
    this.movieUpdated(movie);
    // console.log('selectedMovie', this.selectedMovie)
  }

  editMovie(movie: Movie){
    this.selectedMovie = null;
    this.home = false;
    this.editedMovie = movie;
    // console.log('selectedMovie', this.selectedMovie)
  }

  createNewMovie(){
    this.selectedMovie = null;
    this.home = null;
    this.editedMovie = {id: null, title: '', description: '', avg_rating: null, no_of_ratings: null};
  }

  deletedMovie(movie: Movie) {
    //todo remove movie with api
    // console.log('delete', movie.title);
    this.apiService.deleteMovie(movie.id).subscribe(
      data => {
        console.log(data);
        this.movies = this.movies.filter(mov => mov.id !== movie.id);
      },
      error => console.log(error)
    );
  }

  movieCreated(movie: Movie){
    this.movies.push(movie);
    this.editedMovie = null;

  }
  movieUpdated(movie: Movie){
    const indx = this.movies.findIndex(mov => mov.id === movie.id);
    if(indx >= 0){
      this.movies[indx] = movie;
    }
    this.editedMovie = null;

  }

  // logout() {
  //   this.cookieService.delete('mr-token');
  //   this.router.navigate(['/auth'])
  // }

}
 