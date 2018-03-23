import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignInService} from '../sign-in.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userName: string;
  okMessage: string;
  errorStatus: string;

  constructor(private signInService: SignInService) {
  }

  ngOnInit() {
    this.showUserInfo();
  }

  showUserInfo() {
    return this.signInService.showUserInfo().subscribe((res: any) => {
      if (res) {
        this.userName = res.message.name;
      }
    });
  }

  isTokenValid() {
    return this.signInService.showUserInfo().subscribe((res: any) => {
      if (res) {
        this.okMessage = 'Everything is okay';
      }
    }, (err: any) => {
      this.errorStatus = err.status;
      this.okMessage = null;
    });
  }

}
