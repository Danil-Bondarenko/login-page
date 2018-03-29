import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignInService} from '../sign-in.service';
import {MatSnackBar} from '@angular/material';
import {Router, ActivatedRoute,} from '@angular/router';

@Component({
  selector: 'app-reset-password-v-token',
  templateUrl: './reset-password-v-token.component.html',
  styleUrls: ['./reset-password-v-token.component.css']
})
export class ResetPasswordVTokenComponent implements OnInit {
  passwordForm: FormGroup;
  changePasswordMessage: string;
  token: string;

  constructor(private fb: FormBuilder, private signInService: SignInService, private snackBar: MatSnackBar,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.createForm();
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params.t;
    });
  }

  createForm() {
    this.passwordForm = this.fb.group({
      newPassword: [, Validators.compose([Validators.minLength(5), Validators.required])],
      newPasswordConf: [, Validators.compose([Validators.minLength(5), Validators.required])]
    });
  }

  changeUserPassword(passwordForm) {
    this.signInService.changeUserPasswordAfterReset({
      passwordNew: passwordForm.newPassword,
      passwordNewConf: passwordForm.newPasswordConf
    }, this.token).subscribe((res: any) => {
      if (res) {
        this.changePasswordMessage = null;
        const snackBarRef = this.snackBar.open('Password has been successfully changed', 'Ok!', {
          duration: 3000
        });
        snackBarRef.afterDismissed().subscribe(() => {
          return this.router.navigate(['']);
        });
      }
    }, (err) => {
      this.changePasswordMessage = err.error.message;
    });
    this.passwordForm.reset();
  }

}
