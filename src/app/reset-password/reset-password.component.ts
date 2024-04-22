import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../service/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements AfterViewInit, OnInit {
  //Form Elements
  @ViewChild('updatePasswordForm') updatePasswordForm: ElementRef;
  //Input Elements
  @ViewChild('newPassword') newPassword: ElementRef;
  @ViewChild('newPasswordConfirm') newPasswordConfirm: ElementRef;

  changePasswordInProgress = false;
  updatePasswordInProgress = false;
  linkCorrect = false;
  durationInSeconds = 5;

  uidb64: string;
  token: string;

  constructor(
    private _snackBar: MatSnackBar,
    private backendService: BackendService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.route.params.subscribe((params) => {
      this.uidb64 = encodeURIComponent(params['uidb64']);
      this.token = encodeURIComponent(params['token']);
    });

    this.checkResetLink();

    this.updatePasswordForm.nativeElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.updatePassword();
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
   * check if activation token is correct
   * 
   */
  async checkResetLink() {
    let resp = await this.backendService.checkResetLink(this.uidb64, this.token);
    if (resp['success'] == true) {
      this.linkCorrect = true;
    } else {
      this.linkCorrect = false;
    }
  }

  /**
    * change user password
    * 
    */
  async updatePassword() {
    if (this.resetValidation()) {
      if (this.checkConfirmPassword()) {
        this.updatePasswordInProgress = true;
        const password = this.newPassword.nativeElement.value;
        let resp = await this.backendService.setNewUserPassword(this.uidb64, this.token, password);

        if (resp['success'] == true) {
          this.openSnackBar('Password successfull changed');
          this.clearRegisterForm();
          this.router.navigateByUrl('');
        } else if (resp['success'] == false)
          this.openSnackBar('Change password failed');
      }
    }
    this.updatePasswordInProgress = false;
  }

  /**
   * clear input fields of register form
   * 
   */
  clearRegisterForm() {
    this.newPassword.nativeElement.value = '';
    this.newPasswordConfirm.nativeElement.value = '';
  }

  /**
   * check if confirm password is equal with normal password
   * 
   * @returns password check ok or nok
   */
  checkConfirmPassword() {
    if (this.newPassword.nativeElement.value === this.newPasswordConfirm.nativeElement.value) {
      return true;
    } else {
      this.openSnackBar('Passwords are not equal');
      return false;
    }
  }

  /**
  * validate the input fields for reset password form 
  * 
  * @returns if there is a validation error or not
  */
  resetValidation() {
    // check password length
    if (this.newPassword.nativeElement.value.length < 5) {
      this.openSnackBar('Password must be at least 5 characters long');
      return false;
    }

    return true;
  }
}
