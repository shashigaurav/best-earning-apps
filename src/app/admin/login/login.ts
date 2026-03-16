import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

@Component({

selector:'admin-login',
standalone:true,
imports:[FormsModule,CommonModule],
templateUrl:'./login.html',
styleUrls:['./login.css']

})

export class Login{

username=""
password=""

api="http://localhost:8080/admin/login"

constructor(private http:HttpClient,
            private router:Router){}

login(){

console.log("Login button clicked")

this.http.post<any>(this.api,{
username:this.username,
password:this.password
}).subscribe(res=>{

console.log(res)

this.router.navigate(['/admin/dashboard'])

})

}

}