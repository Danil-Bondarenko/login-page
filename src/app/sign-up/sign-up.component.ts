///<reference path="../../../node_modules/@angular/forms/src/form_builder.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SignInService} from '../sign-in.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(fb: FormBuilder, private router: Router, private signInService: SignInService) {
    this.registerForm = fb.group({
      username: [, Validators.compose([Validators.required, Validators.minLength(10)])],
      // email: [, Validators.compose([Validators.required, Validators.minLength(10)])],
      password: [, Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: [, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }

  signUp(post): void {
    console.log(post);
    console.log(post.confirmPassword);
    this.signInService.signUp({
      name: post.username,
      password: post.password,
      passwordConf: post.confirmPassword,
      admin: false
    }).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.errorMessage = 'Success!';
      } else if (!response.success) {
        this.errorMessage = response.message;
      }
    });
  }

}
