import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignInService} from '../sign-in.service';
import {MatSnackBar, MatIconModule} from '@angular/material';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userName: string;
  okMessage: string;
  errorStatus: string;

  constructor(private signInService: SignInService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.showUserName();
  }

  showUserName() {
    return this.signInService.showUserInfo().subscribe((res: any) => {
      if (res) {
        this.userName = res.message.name;
      }
    });
  }

  isTokenValid() {
    return this.signInService.showUserInfo().subscribe((res: any) => {
      if (res) {
        this.okMessage = 'Your token is still valid';
      }
    }, (err: any) => {
      this.errorStatus = err.status;
      this.okMessage = null;
      const snackBarRef = this.snackBar.open('Your token has expired', 'Damn(', {
        duration: 3000
      });
      snackBarRef.afterDismissed().subscribe(() => {
        return this.router.navigate(['']);
      });
    });
  }

  routeToChangePassword() {
    return this.router.navigate(['change-password'], {queryParams: {username: this.userName}});
  }

  logout() {
    localStorage.removeItem('securityToken');
    return this.router.navigate(['']);
  }

}
