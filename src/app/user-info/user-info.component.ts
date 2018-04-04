import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignInService} from '../sign-in.service';
import {MatSnackBar} from '@angular/material';
import {PushNotificationsService} from 'ng-push';
import {SwPush} from '@angular/service-worker';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userName: string;
  okMessage: string;
  errorStatus: string;

  readonly VAPID_PUBLIC_KEY = 'BL-ssXChuaHObuC9ZFVR4jRSKbS_aNUVJ6zTnUtxspQ5nTiN97mtiJmkvnQa39aqKUOVOEHBEj1t0YwnP15yF6Q';

  constructor(private signInService: SignInService, private snackBar: MatSnackBar, private router: Router,
              private _pushNotifications: PushNotificationsService, private swPush: SwPush) {
  }

  ngOnInit() {
    this.setUserName();
    this.showMessages();
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

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        console.log(JSON.stringify(sub));
        this.signInService.saveUserPushSubscriptionToServer({
          name: this.userName,
          endpoint: sub.endpoint,
          auth: JSON.parse(JSON.stringify(sub)).keys.auth,
          p256dh: JSON.parse(JSON.stringify(sub)).keys.p256dh
        }).subscribe((res) => {
          if (res) {
            console.log('success');
          }
        });
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  showMessages() {
    this.swPush.messages
      .subscribe(message => {
        this._pushNotifications.create('Notification1123', {body: message.toString()}).subscribe(
       //   res => console.log(res),
       //   err => console.log(err)
        );
      });
  }

}
