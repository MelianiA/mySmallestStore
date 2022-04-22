import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  Uid;
  successMessage: any;
  dataArray;

  constructor(private fs: AngularFirestore, private as: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.dataArray = await this.as.getAllProducts();
  }

  addProduct(f) {
    let data = f.value;
    this.fs
      .collection('products')
      .doc()
      .set({
        title: data.title,
        description: data.description,
        image: data.image,
        uid: this.Uid,
      })
      .then(() => {
        this.successMessage = 'Added !';
        console.log(this.successMessage);
      })
      .catch(() => {
        console.log('error !');
      });
  }
}
