import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service'
import { CookieService } from 'ngx-cookie-service';
import { MustMatch } from '../_helpers/must-match.validator'
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

  // authForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl('')
  // });

  public registerMode: boolean = true;
  public authForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token');
    console.log(mrToken);
    if(mrToken) {
      this.router.navigate(['/movies'])
    }

    this.initForm();
  }

  initializeRegisterForm(): void {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  initializeLoginForm(): void {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  initForm(): void {
    this.registerMode = !this.registerMode;
    if (this.registerMode){
      this.initializeRegisterForm();
    } else {
      this.initializeLoginForm();
    }
    console.log(this.authForm)
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
