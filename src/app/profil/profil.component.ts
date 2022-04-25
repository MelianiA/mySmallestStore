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
  dataArray;

  constructor(private as: AuthService) {
    this.Uid = localStorage.getItem('userId')

  }

  async ngOnInit() {
    this.dataProfile = (await this.as.getCurrentUser(this.Uid))[0];
    console.log(this.dataProfile);
  }
}
