import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class Login {

  username: string = ""
  password: string = ""
  error: string = ""
  loading: boolean = false

  // ✅ Correct backend API
  api: string = "https://bestearningapps-backend.onrender.com/admin/login"

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    // validation
    if (!this.username || !this.password) {
      this.error = "Enter username & password ❌"
      return
    }

    this.loading = true
    this.error = ""

    const data = {
      username: this.username,
      password: this.password
    }

    this.http.post<any>(this.api, data).subscribe({

      next: (res) => {

        this.loading = false

        if (res && res.success) {

          // simple auth flag
          localStorage.setItem('admin', 'true')

          // redirect to dashboard
          this.router.navigate(['/admin/dashboard'])

        } else {
          this.error = "Invalid credentials ❌"
        }

      },

      error: (err) => {

        console.error(err)
        this.loading = false
        this.error = "Server error ❌"

      }

    })

  }

}