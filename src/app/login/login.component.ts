import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';
import { SharedService } from '../service/shared.service';
import { BackendService } from '../service/backend.service';
import { Router } from '@angular/router';
import { User } from '../models/user.class';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit , OnInit {
  //Form Elements
  @ViewChild('loginForm') loginForm: ElementRef;
  @ViewChild('registerForm') registerFrom: ElementRef;
  @ViewChild('resetForm') resetForm: ElementRef;
  //login Elements
  @ViewChild('loginEmail') loginEmail: ElementRef;
  @ViewChild('loginPassword') loginPassword: ElementRef;
  //register Elements
  @ViewChild('registerEmail') registerEmail: ElementRef;
  @ViewChild('registerUsername') registerUsername: ElementRef;
  @ViewChild('registerPassword') registerPassword: ElementRef;
  @ViewChild('registerConfirmPassword') registerConfirmPassword: ElementRef;
  //reset password elemts
  @ViewChild('emailResetPassword') emailResetPassword: ElementRef;

  rememberMe = false;
  showLogin = true;
  showHelp = false;
  showResetPassword = false;
  loginInProgress = false;
  registerInProgress = false;
  resetInProgress = false ;
  durationInSeconds = 5;

  color: ThemePalette = 'primary';

  constructor(
    private _snackBar: MatSnackBar,
    private sharedService: SharedService,
    private backendService: BackendService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.router.navigateByUrl('');
  }

  ngAfterViewInit(): void {
    this.loginForm.nativeElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.login();    
    });

    this.registerFrom.nativeElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.register();
    });

    this.resetForm.nativeElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.resetPassword();
    });

    
  }

  /**
   * open the snackbar with message
   * 
   * @param message which shown in snackbar
   */
  openSnackBar(message: string) {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { 'message': message },
    });
  }

  /**
   * autofill password if remember me checkbox is active while login
   * 
   */
  autofillPassword() {
    let rememberedUser = localStorage.getItem('username');
    if (rememberedUser) {
      if (rememberedUser === this.loginEmail.nativeElement.value) {
        this.loginPassword.nativeElement.value = localStorage.getItem('userpassword');
      }
    }
  }

  /**
   * login the user
   * 
   */
  async login() {

    //save remember me checkbox in shared service
    this.sharedService.rememberMeActiv = this.rememberMe;

    if (this.rememberMe) {
      localStorage.setItem('username', this.loginEmail.nativeElement.value);
      localStorage.setItem('userpassword', this.loginPassword.nativeElement.value);
    }

    this.loginInProgress = true;
    try {
      let resp: any = await this.backendService.loginWithUsernameAndPassword(this.loginEmail.nativeElement.value, this.loginPassword.nativeElement.value);
      if (resp['success'] == false) {
        this.openSnackBar('Login failed');
      } else {
        localStorage.setItem('token', resp['token']);
        localStorage.setItem('user', resp['username']);
        this.sharedService.currentUser = resp['username'];
        //router navigate
        this.router.navigateByUrl('start-screen');
      }
    } catch (err) {
      this.openSnackBar(err);
    }

    this.loginInProgress = false;
  }

  /**
   * login in as guest
   * 
   */
  async loginAsGuest() {
    this.loginInProgress = true;
    try {
      let resp = await this.backendService.loginAsGuest();
      if (resp['success'] == false) {
        this.openSnackBar('Login failed');
      } else {
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

  /**
   * register new user
   * 
   */
  async register() {
    if (this.checkConfirmPassword()) {
      this.registerInProgress = true;
      let user = new User({ 'username': this.registerUsername.nativeElement.value, 'email': this.registerEmail.nativeElement.value, 'password': this.registerPassword.nativeElement.value });

      let resp = await this.backendService.registerNewUser(user);

      if (resp['success'] == true) {
        this.openSnackBar('Registration success, please confirm email');
        this.clearRegisterForm();
      } else if (resp['success'] == false)
        this.openSnackBar('Registration failed');
    }
    this.registerInProgress = false ;
  }

  /**
   * clear input fields of register form
   * 
   */
  clearRegisterForm(){
    this.registerUsername.nativeElement.value = '' ;
    this.registerEmail.nativeElement.value = '' ;
    this.registerPassword.nativeElement.value = '' ;
    this.registerConfirmPassword.nativeElement.value = '' ;
  }

  /**
   * check if confirm password is equal with normal password
   * 
   * @returns password check ok or nok
   */
  checkConfirmPassword() {
    if (this.registerPassword.nativeElement.value === this.registerConfirmPassword.nativeElement.value) {
      return true;
    } else {
      this.openSnackBar('Passwords are not equal');
      return false;
    }
  }

  /**
   * send email and generate a link to reset your password
   * 
   */
  async resetPassword(){
    this.resetInProgress = true ;
    let userEmail = this.emailResetPassword.nativeElement.value ;

    let resp = await this.backendService.sendResetUserPasswordEmail(userEmail) ;

    if (resp['success'] == true) {
      this.openSnackBar('Confirm the link in your email')
    } else {
      this.openSnackBar('Something went wrong :(')
    }

    this.resetInProgress = false ;
  }

}
