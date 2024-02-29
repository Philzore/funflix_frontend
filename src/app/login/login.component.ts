import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';
import { SharedService } from '../service/shared.service';
import { BackendService } from '../service/backend.service';
import { Router } from '@angular/router';
import { User } from '../models/user.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  //Form Elements
  @ViewChild('loginForm') loginForm: ElementRef;
  @ViewChild('registerForm') registerFrom: ElementRef;
  //login Elements
  @ViewChild('loginEmail') loginEmail: ElementRef;
  @ViewChild('loginPassword') loginPassword: ElementRef;
  //register Elements
  @ViewChild('registerEmail') registerEmail: ElementRef;
  @ViewChild('registerUsername') registerUsername: ElementRef;
  @ViewChild('registerPassword') registerPassword: ElementRef;
  @ViewChild('registerConfirmPassword') registerConfirmPassword: ElementRef;

  rememberMe = false;
  showLogin = true;
  loginInProgress = false;

  durationInSeconds = 5;

  constructor(
    private _snackBar: MatSnackBar,
    private sharedService: SharedService,
    private backendService: BackendService,
    public router: Router,
  ) { }

  ngAfterViewInit(): void {
    this.loginForm.nativeElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.login();
    });

    this.registerFrom.nativeElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.register();
    });
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { 'message': message },
    });
  }

  async login() {

    //save remember me checkbox in shared service
    this.sharedService.rememberMeActiv = this.rememberMe;

    this.loginInProgress = true;
    try {
      let resp: any = await this.backendService.loginWithUsernameAndPassword(this.loginEmail.nativeElement.value, this.loginPassword.nativeElement.value);
      if (resp['success'] == false) {
        this.openSnackBar('Login failed');
      } else {
        console.log(resp);
        localStorage.setItem('token', resp['token']);
        localStorage.setItem('user', resp['username']);
        //router navigate
        this.router.navigateByUrl('start-screen');
      }
    } catch (err) {
      this.openSnackBar(err);
    }

    this.loginInProgress = false;
  }

  async loginAsGuest() {
    this.loginInProgress = true;
    try {
      let resp = await this.backendService.loginAsGuest();
      if (resp['success'] == false) {
        this.openSnackBar('Login failed');
      } else {
        console.log(resp);
        localStorage.setItem('token', resp['token']);
        localStorage.setItem('user', resp['username']);
        //router navigate
        this.router.navigateByUrl('start-screen');
      }
    } catch (err) {
      this.openSnackBar(err);
    }

    this.loginInProgress = false;

  }

  async register() {
    if (this.checkConfirmPassword()) {
      let user = new User({ 'username': this.registerUsername.nativeElement.value, 'email': this.registerEmail.nativeElement.value, 'password': this.registerPassword.nativeElement.value });

      let resp = await this.backendService.registerNewUser(user);

      this.openSnackBar(resp['error']);
    }


  }

  checkConfirmPassword() {
    if (this.registerPassword.nativeElement.value === this.registerConfirmPassword.nativeElement.value) {
      return true;
    } else {
      this.openSnackBar('Passwords are not equal');
      return false;
    }
  }

}
