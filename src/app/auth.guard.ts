import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {SignInService} from './sign-in.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private signInService: SignInService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.signInService.showUserInfo().map(e => {
      if (e) {
        return true;
      }
    }).catch(() => {
      this.router.navigate(['']);
      return Observable.of(false);
    });
  }
}
