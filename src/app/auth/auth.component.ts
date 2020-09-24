import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
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


  faExclamationCircle = faExclamationCircle;

  public registerError: string;
  public loginError: string;
  public registerMode: boolean = true;
  public authForm: FormGroup;
  public isLoggedIn: boolean = false;

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
      // this.router.navigate(['/movies']);
    }
    this.initForm();
  }

  initializeRegisterForm(): void {
    let currentUser: string = this.authForm.get('username').value;
    let currentPass: string = this.authForm.get('password').value;
    this.authForm = this.fb.group({
      username: [currentUser, [Validators.required, Validators.minLength(3)]],
      password: [currentPass, [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  initializeLoginForm(): void {
    let currentUser: string = '';
    let currentPass: string = '';
    if(this.authForm) {
      currentUser = this.authForm.get('username').value;
      currentPass = this.authForm.get('password').value;
    } 

    this.authForm = this.fb.group({
      username: [currentUser, [Validators.required, Validators.minLength(3)]],
      password: [currentPass, [Validators.required, Validators.minLength(8)]]
    });
  }

  initForm(): void {
    this.registerMode = !this.registerMode;
    this.loginError = null;
    this.registerError = null;
    if (this.registerMode){
      this.initializeRegisterForm();
    } else {
      this.initializeLoginForm();
    }
    console.log(this.authForm)
  }

  saveForm(){
    if(this.authForm.valid) {

      if(this.registerMode){
        let formData = {
          username: this.authForm.get('username').value,
          password: this.authForm.get('password').value
        }
        let observable = this.apiService.registerUser(formData);
        observable.subscribe(res =>  this.loginUser(),
        err => {
          this.registerError = "Username already exists"
        })
      } else {
        this.loginUser();
      }
    }
    // if (!this.registerMode) {
    //   this.loginUser();
    //   // this.apiService.loginUser(this.authForm.value).subscribe(
    //   //   (result: TokenObj) => {
    //   //     this.router.navigate(['/movies'])
    //   //     console.log(result);
    //   //     this.cookieService.set("mr-token", result.token);
    //   //    },
    //   //   error => console.log(error),
    //   // );
    //   // console.log(this.authForm.value);
    // } else {   
    //     this.apiService.registerUser(this.authForm.value).subscribe(
    //       result=> {
    //         this.loginUser();
    //         console.log(result);
    //       },
    //       error => console.log(error),
    //     );
    // }
  }


  // loginUser () {
    

  //   this.apiService.loginUser(this.authForm.value).subscribe(
  //     (result: TokenObj) => {
  //       this.router.navigate(['/movies'])
  //       console.log(result);
  //       this.cookieService.set("mr-token", result.token);
  //      },
  //     error => console.log(error),
  //   );
  // }

  loginUser() {
    let observable = this.apiService.loginUser(this.authForm.value);
    observable.subscribe(
      (token: TokenObj) => {
        this.cookieService.set('mr-token', token.token);
        this.router.navigate(['/movies']);
      },
      error => {
        this.registerError = '';
        this.loginError = 'Username or password incorrect';
      }
    )
  }
}
