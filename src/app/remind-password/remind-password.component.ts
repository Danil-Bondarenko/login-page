import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignInService} from '../sign-in.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.css']
})
export class RemindPasswordComponent implements OnInit {
  remindPasswordForm: FormGroup;
  message: string;

  constructor(private fb: FormBuilder, private signInService: SignInService, private snackBar: MatSnackBar, private router: Router) {
    this.remindPasswordForm = fb.group({
      email: [, Validators.minLength(1)]
    });
  }

  ngOnInit() {
  }

  remindPassword(email): void {
    this.signInService.remindPassword({mail: email.email}).subscribe((res) => {
      if (res) {
        this.message = null;
        const snackBarRef = this.snackBar.open('Success request! Check your email', 'Ok', {
          duration: 3000
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['']);
        });
      }
    }, (err) => {
      this.message = err.error.message;
    });
  }


}