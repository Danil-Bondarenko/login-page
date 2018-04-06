import {MaterializeModule} from 'angular2-materialize';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {PushNotificationsModule} from 'ng-push';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {TimerPageComponent} from './timer-page/timer-page.component';
import {SignInService} from './sign-in.service';
import {UserInfoComponent} from './user-info/user-info.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule, MatMenuModule, MatSnackBarModule} from '@angular/material';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ResetPasswordVTokenComponent} from './reset-password-v-token/reset-password-v-token.component';
import {AuthGuard} from './auth.guard';
import { ToDoComponent } from './to-do/to-do.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard]},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'password_change', component: ResetPasswordVTokenComponent},
  {path: 'to-do-list/:userName', component: ToDoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TimerPageComponent,
    UserInfoComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ResetPasswordVTokenComponent,
    ToDoComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    PushNotificationsModule
  ],
  providers: [SignInService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
