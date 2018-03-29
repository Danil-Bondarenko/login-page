import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignInService} from '../sign-in.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  remindPasswordForm: FormGroup;
  message: string;

  constructor(private fb: FormBuilder, private signInService: SignInService, private snackBar: MatSnackBar, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.remindPasswordForm = this.fb.group({
      email: [, Validators.compose([Validators.minLength(5), Validators.required, Validators.pattern(this.signInService.emailRegExp)])]
  });
  }

  resetPassword(email) {
    this.signInService.resetPassword({mail: email.email}).subscribe((res) => {
      if (res) {
        this.message = null;
        const snackBarRef = this.snackBar.open('Success request! Check your email', 'Ok', {
          duration: 3000
        });
        snackBarRef.afterDismissed().subscribe(() => {
          return this.router.navigate(['']);
        });
      }
    }, (err) => {
      this.message = err.error.message;
    });
  }


}
