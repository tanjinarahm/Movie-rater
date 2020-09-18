import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../models/Movie'
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  @Input() movies: Movie[] = [];
  @Output() selectMovie  = new EventEmitter<Movie>();
  @Output() editedMovie  = new EventEmitter<Movie>();
  @Output() createNewMovie  = new EventEmitter();
  @Output() deletedMovie  = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit(): void {}

  movieClicked(movie: Movie) {
    console.log('Selected movie', movie);

    this.selectMovie.emit(movie);
  }

  editMovie(movie: Movie){
    console.log('Movie to edit', movie);
    this.editedMovie.emit(movie);
  }

  newMovie(){
    this.createNewMovie.emit();
  }
  deleteMovie(movie: Movie){
    this.deletedMovie.emit(movie);
  }
}
