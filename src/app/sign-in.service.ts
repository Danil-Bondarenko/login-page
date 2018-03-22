import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const apiUrl = 'http://localhost:8080/api/';
const headers = new HttpHeaders({'Content-Type': 'application/json'});
const options = {headers: headers};

@Injectable()
export class SignInService {

  constructor(private http: HttpClient) {
  }

  login(user) {
    console.log(user);
    return this.http.post(apiUrl + 'authenticate', user, options);
  }

  signUp(newUser) {
    return this.http.post(apiUrl + 'create', newUser, options);
  }

}
