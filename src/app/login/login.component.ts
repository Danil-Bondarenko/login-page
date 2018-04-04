import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SignInService} from '../sign-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private router: Router, private signInService: SignInService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [, Validators.compose([Validators.required, Validators.minLength(5)])],
      password: [, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  loginUser(post) {
    this.signInService.login({name: post.username, password: post.password}).subscribe((res: any) => {
      if (res.success) {
        this.errorMessage = null;
        localStorage.setItem('securityToken', res.token);
        return this.router.navigate(['user-info']);
      }
    }, (err) => {
      this.errorMessage = err.error.message;
    });
  }

}
