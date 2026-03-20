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

  username = ""
  password = ""
  error = ""
  loading = false

  // 🔥 Render backend URL
  api = "https://best-earning-apps-backend.onrender.com/admin/login"

  constructor(
    private http:HttpClient,
    private router:Router
  ){}

  login(){

    if(!this.username || !this.password){
      this.error = "Enter username & password ❌"
      return
    }

    this.loading = true
    this.error = ""

    this.http.post<any>(this.api,{
      username:this.username,
      password:this.password
    }).subscribe({

      next: (res)=>{

        this.loading = false

        if(res.success){
          // 🔥 simple auth
          localStorage.setItem('admin','true')

          this.router.navigate(['/admin/dashboard'])
        }else{
          this.error = "Invalid credentials ❌"
        }

      },

      error: ()=>{
        this.loading = false
        this.error = "Server error ❌"
      }

    })

  }

}