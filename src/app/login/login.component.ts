import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  rememberMe = false;
  showLogin = true;

  durationInSeconds = 5;

  constructor(
    private _snackBar: MatSnackBar,
    private sharedService: SharedService,
  ) { }

  openSnackBar(message) {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: message },
    });
  }

  login() {
    //save remember me checkbox in shared service
    this.sharedService.rememberMeActiv = this.rememberMe ;


  }
}
