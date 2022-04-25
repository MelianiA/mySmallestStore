import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isSigned;
  constructor(
    private af: AngularFireAuth,
    private route: Router,
    private as: AuthService
  ) {
    this.as.user.subscribe((user) => {
      if (user) {
        this.isSigned = true;
      } else {
        this.isSigned = false;
      }
    });
  }

  ngOnInit(): void {}

  logout() {
    this.af
      .signOut()
      .then(() => {
        console.log('logout done !');
        localStorage.removeItem('userId');
        this.route.navigate(['/login']);
      })
      .catch(() => {
        console.log("Can't logout !");
      });
  }
}
