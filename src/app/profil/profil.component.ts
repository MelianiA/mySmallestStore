import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import * as $ from 'jquery';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  Uid;
  dataProfile;
  dataArray;
  updated = false;
  imageUpdated = false;
  task;
  ref;
  percentage;

  constructor(
    private as: AuthService,
    private fs: AngularFirestore,
    private fst: AngularFireStorage
  ) {
    this.Uid = localStorage.getItem('userId');
  }

  async ngOnInit() {
    this.dataProfile = (await this.as.getCurrentUser(this.Uid))[0];
  }

  update() {
    this.fs
      .collection('users')
      .doc(this.dataProfile.uid)
      .update({
        flName: this.dataProfile.flName,
        bio: this.dataProfile.bio,
        image: this.dataProfile.image,
      })
      .then(() => {
        this.updated = true;
        window.location.reload();
      });
  }

  updateImage(event) {
    const id = uuidv4();
    let imageLastURL = this.dataProfile.image;
    this.ref = this.fst.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.percentage = this.task.percentageChanges();
    this.task
      .then((data) => {
        data.ref.getDownloadURL().then((url) => {
          this.fs
            .collection('users')
            .doc(this.dataProfile.uid)
            .update({
              image: url,
            })
            .then(async () => {
              this.fst.storage.refFromURL(imageLastURL).delete().then(() => {
              }).catch(() => {
              }).finally(() => {
                this.imageUpdated = true;
                this.dataProfile.image = url
                $(".btn-close").click()
              })
            });
        });
      })
      .catch(() => {
        console.log('une erreur dans updateImage ');
      });
  }

  deleteImage() {
    this.fst.storage.refFromURL(this.dataProfile.image).delete().then(() => { console.log("deleted " + this.dataProfile.image) }).catch(() => { console.log("erreur !") })
    // window.location.reload()
  }
}
