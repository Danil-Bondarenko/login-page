///<reference path="../../../node_modules/@angular/forms/src/form_builder.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SignInService} from '../sign-in.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private router: Router, private signInService: SignInService, private snackBar: MatSnackBar) {
    this.registerForm = fb.group({
      username: [, Validators.compose([Validators.required, Validators.minLength(1)])],
      email: [, Validators.compose([Validators.required, Validators.minLength(1)])],
      password: [, Validators.compose([Validators.required, Validators.minLength(1)])],
      confirmPassword: [, Validators.compose([Validators.required, Validators.minLength(1)])]
    });
  }

  ngOnInit() {
  }

  signUp(post): void {
    this.signInService.signUp({
      name: post.username,
      mail: post.email,
      password: post.password,
      passwordConf: post.confirmPassword,
    }).subscribe((response: any) => {
      if (response.success) {
        this.errorMessage = null;
        const snackBarRef = this.snackBar.open('You have been successfully registered', 'Cool!', {
          duration: 3000
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['']);
        });
      }
    }, (err) => {
      console.log(err);
      this.errorMessage = err.error.message;
    });
    this.registerForm.reset();
  }


}
