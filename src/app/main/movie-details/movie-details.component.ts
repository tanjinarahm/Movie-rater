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
  @Output() updateMovie = new EventEmitter<Movie>();

  rateHovered = 0;

  faStar = faStar;
  cookieService: CookieService;
  router: Router;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  rateHover(rate: number) {
    this.rateHovered = rate;
  }

  rateClicked(rate: number) {
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
  

  // logout() {

  //   this.cookieService.delete('mr-token');
  //   this.router.navigate(['/auth'])
  // }
}
