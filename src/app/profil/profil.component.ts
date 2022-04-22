import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  Uid;
  dataProfile;
  constructor(private as: AuthService) {
    this.as.user.subscribe((user) => {
      this.Uid = user.uid;
    });
  }

  ngOnInit(): void {
  //  let users = this.as.getCurrentUser(this.Uid)
    console.log(this.Uid)
  }
}
