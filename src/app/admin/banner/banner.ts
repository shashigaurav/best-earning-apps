import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({

selector:'admin-banner',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./banner.html',
styleUrls:['./banner.css']

})

export class Banner{

image=""

api="http://localhost:8080/admin/banner"

constructor(private http:HttpClient){}

/* UPDATE BANNER */

updateBanner(){

const data={
image:this.image
}

this.http.put(this.api,data).subscribe(()=>{

alert("Banner Updated")

})

}

}