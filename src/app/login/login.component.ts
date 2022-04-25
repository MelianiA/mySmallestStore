import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  messageError;
  Uid: any;
  constructor(
    private sa: AuthService,
    private route: Router,
    private as: AuthService
  ) {}

  ngOnInit(): void {}

  login(f) {
    let data = f.value;
    this.sa
      .signIn(data.flName, data.password)
      .then(async (user) => {
        console.log('login ok');
        this.as.user.subscribe((user) => {
          this.Uid = user.uid;
        });
        await new Promise((f) => setTimeout(f, 400));
        localStorage.setItem('userId', this.Uid);
        console.log(this.Uid);
        this.route.navigate(['/']);
      })
      .catch(() => {
        console.log('login error');
        this.messageError = 'Incorrect email or Password !';
      });
  }
}
