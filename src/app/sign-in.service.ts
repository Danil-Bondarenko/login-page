import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const apiUrl = 'http://localhost:8080/api/';
const headers = new HttpHeaders({'Content-Type': 'application/json'});
let options = {headers: headers};

@Injectable()
export class SignInService {

  constructor(private http: HttpClient) {
  }

  login(user) {
    return this.http.post(apiUrl + 'authenticate', user, options);
    // const headersWithToken = new HttpHeaders({'Authorization': localStorage.getItem('securityToken')});
    // options = {headers: headersWithToken};
  }

  signUp(newUser) {
    return this.http.post(apiUrl + 'create', newUser, options);
  }

}
