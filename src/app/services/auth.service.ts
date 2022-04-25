import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user;
  Products;

  constructor(private fa: AngularFireAuth, private db: AngularFirestore) {
    this.user = this.fa.user;
  }

  signUp(email, password) {
    return this.fa.createUserWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return this.fa.signInWithEmailAndPassword(email, password);
  }

  getAllProducts() {
    return new Promise<any>((resolve) => {
      this.db
        .collection('products')
        .valueChanges({ idField: 'id' })
        .subscribe((products) => resolve(products));
    });
  }

  getCurrentUser(Uid: string) {
    return new Promise<any>((resolve) => {
      this.db
        .collection('users', (ref) => ref.where('uid', '==', Uid))
        .valueChanges()
        .subscribe((users) => resolve(users));
    });
  }
}
