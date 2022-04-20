import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageError
  constructor(private sa:AuthService, private route:Router ) { }

  ngOnInit(): void {
  }

  login(f){
    let data = f.value
    this.sa.signIn(data.flName,data.password).then(() => {
      console.log("login ok")
      this.route.navigate(["/"])
    }).catch(() => {
      console.log("login error")
      this.messageError="Incorrect email or Password !"
    })
  }
}
