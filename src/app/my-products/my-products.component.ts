import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent implements OnInit {
  Uid;
  successMessage: any;
  dataArray;
  productToUpdate;

  constructor(private fs: AngularFirestore, private as: AuthService) {
    this.as.user.subscribe((user) => {
      this.Uid = user.uid;
    });
  }

  async ngOnInit(): Promise<void> {
    this.dataArray = (await this.as.getAllProducts()).filter(elem => elem.uid === this.Uid);
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
        window.location.reload();
      })
      .catch(() => {
        console.log('error !');
      });
  }

  async delete(id) {
    if (confirm("Are you sure to delete this product ? ")) {
      this.fs.collection("products").doc(id).delete()
      this.dataArray = (await this.as.getAllProducts()).filter(elem => elem.uid === this.Uid);

    }
  }

  chooseProductToUpdate(data) {
    this.productToUpdate = data
    console.log(this.productToUpdate)
  }

  update() {
    this.fs
      .collection('products')
      .doc(this.productToUpdate.id)
      .update({
        title: this.productToUpdate.title,
        description: this.productToUpdate.description,
        image: this.productToUpdate.image,
      })
      .then(() => {
        this.successMessage = "Updated";
        window.location.reload();
      });
  }


}
