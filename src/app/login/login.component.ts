import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, NavigationExtras} from '@angular/router';
import {SignInService} from '../sign-in.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(fb: FormBuilder, private router: Router, private signInService: SignInService) {
    this.loginForm = fb.group({
      username: [],
      password: []
    });
  }

  ngOnInit() {
  }

  loginUser(post): void {
    this.signInService.login({name: post.username, password: post.password, admin: true}).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.errorMessage = 'Success!';
        localStorage.setItem('securityToken', res.token);
        console.log(localStorage.getItem('securityToken'));
      } else if (!res.success) {
        this.errorMessage = res.message;
      }
    });
    // this.router.navigate(['parent-info/'], {queryParams: {'username': post.parentFirstName, 'password': post.parentLastName}});
  }

}
