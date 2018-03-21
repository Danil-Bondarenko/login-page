import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router) {
    this.loginForm = fb.group({
      login: [, Validators.compose([Validators.required, Validators.minLength(10)])],
      password: [, Validators.compose([Validators.required, Validators.minLength(10)])]
    });
  }

  ngOnInit() {
  }

  login(post): void {
    this.router.navigate(['parent-info/'], {queryParams: {'login': post.parentFirstName, 'password': post.parentLastName}});
  }

}
