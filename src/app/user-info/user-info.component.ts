import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignInService} from '../sign-in.service';
import {MatSnackBar} from '@angular/material';
import {PushNotificationsService} from 'ng-push';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userName: string;
  okMessage: string;
  errorStatus: string;

  constructor(private signInService: SignInService, private snackBar: MatSnackBar, private router: Router,
              private _pushNotifications: PushNotificationsService) {
  }

  ngOnInit() {
    this.setUserName();
  }

  setUserName() {
    return this.signInService.showUserInfo().subscribe((res: any) => {
      if (res) {
        this.userName = res.message.name;
      }
    });
  }

  isTokenValid() {
    return this.signInService.showUserInfo().subscribe((res: any) => {
      if (res) {
        console.log(res);
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

  subscribe() {
    this._pushNotifications.requestPermission();
  }

  sendNotif() {
    this._pushNotifications.create('Test', {body: 'something'}).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }
}
