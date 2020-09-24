import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isClosed: boolean = true;
  public isLoggedIn: boolean = false;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token');
    if(mrToken) {
      console.log("token!!")
      this.isLoggedIn = true;
    } 
  }

  activateMenu(): void {
    this.isClosed = !this.isClosed
    const mrToken = this.cookieService.get('mr-token');
    if(mrToken) {
      console.log("token!!")
      this.isLoggedIn = true;
    } 
  }

    logout() {
      this.isClosed = true;
      // this.activateMenu();
      this.cookieService.delete('mr-token');
      this.router.navigate(['/auth'])
      // console.log("logged out")
  }

}
