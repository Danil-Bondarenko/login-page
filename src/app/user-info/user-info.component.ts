import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {SignInService} from '../sign-in.service';
import {MatSnackBar} from '@angular/material';
import {PushNotificationsService} from 'ng-push';

// import {SwPush} from '@angular/service-worker';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  userName: string;
  okMessage: string;
  errorStatus: string;

// ,private swPush: SwPush
  VAPID_PUBLIC_KEY = 'BHahVeTb8Ld-xr30nnY6T6ycFipczUHcBO4PnNKVB-xGBeUnEiDzWt1jRey73_0lrij6MB5HQg91ItCMv4lqDUo';

  constructor(private signInService: SignInService, private snackBar: MatSnackBar, private router: Router,
              private _pushNotifications: PushNotificationsService) {
  }

  ngOnInit() {
    this.setUserName();
    //   this.showMessages();
  }

  ngOnDestroy() {
    this.signInService.userName = this.userName;
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

  routeToToDoList() {
    return this.router.navigate(['to-do-list/', this.userName]);
  }

  logout() {
    localStorage.removeItem('securityToken');
    return this.router.navigate(['']);
  }

  // subscribeToNotifications() {
  //   this.swPush.requestSubscription({
  //     serverPublicKey: this.VAPID_PUBLIC_KEY
  //   })
  //     .then(sub => {
  //       console.log(this.VAPID_PUBLIC_KEY);
  //       console.log(JSON.stringify(sub));
  //       this.signInService.saveUserPushSubscriptionToServer({
  //         name: this.userName,
  //         endpoint: sub.endpoint,
  //         auth: JSON.parse(JSON.stringify(sub)).keys.auth,
  //         p256dh: JSON.parse(JSON.stringify(sub)).keys.p256dh
  //       }).subscribe((res) => {
  //         if (res) {
  //           console.log('success');
  //         }
  //       });
  //     })
  //     .catch(err => console.error('Could not subscribe to notifications', err));
  // }

  // showMessages() {
  //   this.swPush.messages
  //     .subscribe(message => {
  //       console.log(message);
  //       this._pushNotifications.create('Test notification', {body: message.toString()}).subscribe(
  //    //     res => console.log(res),
  //   //      err => console.log(err)
  //       );
  //       console.log(message.toString());
  //     });
  // }

}
