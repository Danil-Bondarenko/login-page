import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TimerPageComponent } from './timer-page/timer-page.component';
import {SignInService} from './sign-in.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TimerPageComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [SignInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
