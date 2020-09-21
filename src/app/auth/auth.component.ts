import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service'
import { CookieService } from 'ngx-cookie-service';
// import { faTheRedYeti } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';

interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  registerMode = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token');
    console.log(mrToken);
    if(mrToken) {
      this.router.navigate(['/movies'])
    }
  }

  saveForm(){
    if (!this.registerMode) {
      this.loginUser();
      // this.apiService.loginUser(this.authForm.value).subscribe(
      //   (result: TokenObj) => {
      //     this.router.navigate(['/movies'])
      //     console.log(result);
      //     this.cookieService.set("mr-token", result.token);
      //    },
      //   error => console.log(error),
      // );
      // console.log(this.authForm.value);
    } else {   
        this.apiService.registerUser(this.authForm.value).subscribe(
          result=> {
            this.loginUser();
            console.log(result);
          },
          error => console.log(error),
        );
    }
  }
  loginUser () {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        this.router.navigate(['/movies'])
        console.log(result);
        this.cookieService.set("mr-token", result.token);
       },
      error => console.log(error),
    );
  }
}
