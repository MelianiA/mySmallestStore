import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { subscribeOn, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  messageError;
  Uid: any;
  getUser: Subscription
  constructor(
    private sa: AuthService,
    private route: Router,
    private as: AuthService
  ) {
    this.getUser = new Subscription()
  }

  ngOnInit(): void {
    this.getUser = this.as.user.subscribe((user) => {
      this.Uid = user.uid;
    });
  }

  login(f) {
    let data = f.value;
    this.sa
      .signIn(data.flName, data.password)
      .then(async (user) => {
        console.log('login ok');
        this.getUser = this.as.user.subscribe((user) => {
          this.Uid = user.uid;
        });
        await new Promise((f) => setTimeout(f, 400)).then(() => {
          localStorage.setItem('userId', this.Uid);
          this.route.navigate(['/']);
        });

      })
      .catch(() => {
        console.log('login error');
        this.messageError = 'Incorrect email or Password !';
      });
  }

  ngOnDestroy(): void {
    this.getUser.unsubscribe()
  }

}
