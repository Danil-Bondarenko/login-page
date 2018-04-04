import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const apiUrl = 'http://localhost:8080/';
const headers = new HttpHeaders({'Content-Type': 'application/json'});
let options = {headers: headers};

@Injectable()
export class SignInService {
  // tslint:disable-next-line
  emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private http: HttpClient) {
  }

  login(user) {
    return this.http.post(apiUrl + 'login', user, options);
  }

  signUp(newUser) {
    return this.http.post(apiUrl + 'create', newUser, options);
  }

  showUserInfo() {
    const headersForUserInfo = new HttpHeaders({'token': localStorage.getItem('securityToken')});
    options = {headers: headersForUserInfo};
    return this.http.post(apiUrl + 'user', {}, options);
  }

  changeUserPassword(newPassword) {
    const headersForUserInfo = new HttpHeaders({'token': localStorage.getItem('securityToken')});
    options = {headers: headersForUserInfo};
    return this.http.post(apiUrl + 'edit', newPassword, options);
  }

  resetPassword(email) {
    return this.http.post(apiUrl + 'restore', email, options);
  }

  changeUserPasswordAfterReset(newPassword, token) {
    const headersForUserInfo = new HttpHeaders({'token': token});
    options = {headers: headersForUserInfo};
    return this.http.post(apiUrl + 'password_change', newPassword, options);
  }

  saveUserPushSubscriptionToServer(subscription) {
    return this.http.post(apiUrl + 'subscribe', subscription, options);
  }

}
