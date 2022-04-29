import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-jquery-examples',
  templateUrl: './jquery-examples.component.html',
  styleUrls: ['./jquery-examples.component.css']
})
export class JqueryExamplesComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
    
  }

  loadData(){
    $.get("https://api.thecatapi.com/v1/images/search", function (data) {
      $("#theImg").remove();
      $("#result").prepend('<img id="theImg" src="'+data[0].url+'"  height="200" width="400" />') ;
    });
  }

}
