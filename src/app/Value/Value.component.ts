import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// dang vuong cho cors: chinh sach cung nguon
@Component({
  selector: 'app-Value',
  templateUrl: './Value.component.html',
  styleUrls: ['./Value.component.css']
})
export class ValueComponent implements OnInit {

  values: any;

  constructor(private http: HttpClient) { }

  // goi cac ham khi Value Component duoc khoi tao ah
  ngOnInit() {
    this.getValues();
  }
  
  // muon lay data tra ve tu api phai subcribe
  getValues(){
    this.http.get('http://localhost:5000/api/weatherforecast').subscribe(res => {
      this.values = res;
    }, err => {
      console.log(err);
    })
  }

}
