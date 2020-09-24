import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() isLoggedIn: boolean  = false;

  constructor() { }

  ngOnInit(): void {
  }

  // registerAuth(): void {
  //   this.registerMode = false;
  // }
}
