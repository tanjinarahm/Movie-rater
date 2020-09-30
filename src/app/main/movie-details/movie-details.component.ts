import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service'
import { Movie } from '../../models/Movie'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: Movie;
  @Input() public isLoggedIn : boolean;
  @Output() updateMovie = new EventEmitter<Movie>();
  @Output() public selectMovie  = new EventEmitter<Movie>();
  @Output() public editedMovie  = new EventEmitter<Movie>();
  @Output() public createNewMovie  = new EventEmitter();
  @Output() public deletedMovie  = new EventEmitter<Movie>();

  rateHovered = 0;

  faStar = faStar;
  cookieService: CookieService;
  router: Router;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    console.log('is logged in? ', this.isLoggedIn)
  }

  rateHover(rate: number) {
    this.rateHovered = rate;
    console.log("trying to rate");
  }

  rateClicked(rate: number) {
    console.log("rate it")
    this.apiService.rateMovie(rate, this.movie.id).subscribe(
      result => {
        this.getDetails(),
        error => console.log(error)
      });
  }
  

  getDetails() {
    this.apiService.getMovie(this.movie.id).subscribe(
      (movie: Movie) => {
        this.updateMovie.emit(movie);
      },
      error => console.log(error)
      
    );
  }
  

  logout() {

    this.cookieService.delete('mr-token');
    this.router.navigate(['/auth'])
  }


  // movieClicked(movie: Movie) {
  //   console.log('Selected movie', movie);

  //   this.selectMovie.emit(movie);
  // }

  editMovie(){
    console.log('Movie to edit', this.movie);
    this.editedMovie.emit(this.movie);
  }

  newMovie(){
    this.createNewMovie.emit();
  }
  deleteMovie(){
    if(confirm("Are you sure you want to delete " + this.movie.title + "?")) {
      this.deletedMovie.emit(this.movie);
    }
  }
}
