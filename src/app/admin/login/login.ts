import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'


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

  // API from environment
  api: string = environment.api + "/admin/login"

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

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

          localStorage.setItem('admin', 'true')
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