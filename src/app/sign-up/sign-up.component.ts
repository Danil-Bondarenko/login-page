///<reference path="../../../node_modules/@angular/forms/src/form_builder.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router) {
    this.registerForm = fb.group({
      login: [, Validators.compose([Validators.required, Validators.minLength(10)])],
      email: [, Validators.compose([Validators.required, Validators.minLength(10)])],
      password: [, Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: [, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }

  register(post): void {

  }

}
