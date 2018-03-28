import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignInService} from '../sign-in.service';
import {MatSnackBar} from '@angular/material';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userName: string;
  okMessage: string;
  errorStatus: string;
  changePasswordMessage: string;
  passwordForm;

  constructor(private signInService: SignInService, private snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.passwordForm = fb.group({
      oldPassword: [, Validators.minLength(1)],
      newPassword: [, Validators.minLength(1)],
      newPasswordConf: [, Validators.minLength(1)]
    });
  }

  ngOnInit() {
    this.showUserName();
  }

  showUserName() {
    return this.signInService.showUserInfo().subscribe((res: any) => {
      if (res) {
        this.userName = res.message.name;
      }
    });
  }

  isTokenValid() {
    return this.signInService.showUserInfo().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.okMessage = 'Your token is still valid';
      }
    }, (err: any) => {
      console.log(err);
      this.errorStatus = err.status;
      this.okMessage = null;
      const snackBarRef = this.snackBar.open('Your token has expired', 'Damn(', {
        duration: 3000
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['']);
      });
    });
  }

  changeUserPassword(passwordForm) {
    this.signInService.changeUserPassword({
      password: passwordForm.oldPassword,
      passwordNew: passwordForm.newPassword,
      passwordNewConf: passwordForm.newPasswordConf
    }).subscribe((res: any) => {
      if (res) {
        this.changePasswordMessage = 'Password has been successfully changed';
      }
    }, (err) => {
      console.log(err);
      this.changePasswordMessage = err.error.message;
    });
    this.passwordForm.reset();
  }

}
