import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private sa:AuthService) { }

  ngOnInit(): void {
  }

  register(f:any){

    let data = f.value
     this.sa.signUp(data.email, data.password).then(()=>{
        console.log("done !")
     }).catch(() => {
      console.log("error !")
     })

  }

}
