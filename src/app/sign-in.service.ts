import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const apiUrl = 'http://localhost:8080/';
const headers = new HttpHeaders({'Content-Type': 'application/json'});
let options = {headers: headers};

@Injectable()
export class SignInService {

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

}
