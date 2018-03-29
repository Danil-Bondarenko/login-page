import {Component, OnInit} from '@angular/core';
import {SignInService} from '../sign-in.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  changePasswordMessage: string;

  constructor(private signInService: SignInService, private snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.passwordForm = this.fb.group({
      oldPassword: [, Validators.compose([Validators.minLength(5), Validators.required])],
      newPassword: [, Validators.compose([Validators.minLength(5), Validators.required])],
      newPasswordConf: [, Validators.compose([Validators.minLength(5), Validators.required])]
    });
  }

  changeUserPassword(passwordForm) {
    this.signInService.changeUserPassword({
      password: passwordForm.oldPassword,
      passwordNew: passwordForm.newPassword,
      passwordNewConf: passwordForm.newPasswordConf
    }).subscribe((res: any) => {
      if (res) {
        this.changePasswordMessage = null;
        const snackBarRef = this.snackBar.open('Password has been successfully changed', 'Ok!', {
          duration: 3000
        });
        snackBarRef.afterDismissed().subscribe(() => {
          return this.router.navigate(['user-info']);
        });
      }
    }, (err) => {
      console.log(err);
      this.changePasswordMessage = err.error.message;
    });
    this.passwordForm.reset();
  }

}
