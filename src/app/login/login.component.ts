import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class LoginComponent {
  // @ViewChild('email') email:ElementRef;
  // @ViewChild('password') password:ElementRef;

  rememberMe = false;
  showLogin = true;
  loginInProgress = false ;

  durationInSeconds = 5;

  constructor(
    private _snackBar: MatSnackBar,
    private sharedService: SharedService,
    private backendService: BackendService,
    public router: Router,
  ) { }

  openSnackBar(message) {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: message },
    });
  }

  login() {
    debugger;
    //save remember me checkbox in shared service
    // this.sharedService.rememberMeActiv = this.rememberMe;

    // let user = new User({username: this.email.nativeElement.value, email : this.email.nativeElement.value});

    // console.log(user);

    // debugger;


    // this.loginInProgress = true;
    // try {
    //   let resp: any = await this.backendService.loginWithUsernameAndPassword(this.email.nativeElement.value , this.password.nativeElement.value);
    //   if (resp.success == false) {
    //     //TODO error
    //   } else {
    //      localStorage.setItem('token', resp['token']);
    //      localStorage.setItem('user', resp['name']);

        
    //     //router navigate
    //   }
    // } catch (err) {

    // }
    // this.loginInProgress = false;

    return false;
  }
}
