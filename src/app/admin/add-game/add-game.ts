import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'add-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-game.html',
  styleUrls: ['./add-game.css']
})
export class AddGame {

  appName = ""
  gameTitle = ""
  bonus = ""
  keywords = ""
  downloadLink = ""
  category = "all apps"

  imageName = ""
  loading = false
  message = ""
  error = ""

  // 🔥 LIVE BACKEND
  uploadApi = "https://best-earning-apps-backend.onrender.com/upload"
  addGameApi = "https://best-earning-apps-backend.onrender.com/admin/games"

  constructor(private http: HttpClient) {}

  /* IMAGE UPLOAD */
  uploadImage(event: any) {

    const file = event.target.files[0]

    if(!file){
      this.error = "Select image ❌"
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    this.http.post<any>(this.uploadApi, formData).subscribe({
      next: (res) => {
        this.imageName = res.fileName
        this.message = "Image uploaded ✅"
      },
      error: () => {
        this.error = "Upload failed ❌"
      }
    })
  }

  /* ADD GAME */
  addGame() {

    if(!this.appName || !this.downloadLink){
      this.error = "Fill required fields ❌"
      return
    }

    this.loading = true
    this.message = ""
    this.error = ""

    const data = {
      appName: this.appName,
      gameTitle: this.gameTitle,
      bonus: this.bonus,
      image: this.imageName,
      keywords: this.keywords,
      downloadLink: this.downloadLink,
      category: this.category
    }

    this.http.post(this.addGameApi, data).subscribe({
      next: () => {
        this.loading = false
        this.message = "Game Added Successfully ✅"

        // 🔥 RESET FORM
        this.appName = ""
        this.gameTitle = ""
        this.bonus = ""
        this.keywords = ""
        this.downloadLink = ""
        this.imageName = ""
      },
      error: () => {
        this.loading = false
        this.error = "Failed to add game ❌"
      }
    })

  }

}