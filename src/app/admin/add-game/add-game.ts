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

  appName: string = ""
  gameTitle: string = ""
  bonus: string = ""
  keywords: string = ""
  downloadLink: string = ""
  category: string = "all apps"

  imageName: string = ""

  uploadApi = "http://localhost:8080/upload"
  addGameApi = "http://localhost:8080/admin/games"

  constructor(private http: HttpClient) {}

  uploadImage(event: any) {
    const file = event.target.files[0]

    const formData = new FormData()
    formData.append("file", file)

    this.http.post<any>(this.uploadApi, formData).subscribe(res => {
      this.imageName = res.fileName
    })
  }

  addGame() {

    const data = {
      appName: this.appName,
      gameTitle: this.gameTitle,
      bonus: this.bonus,
      image: this.imageName,
      keywords: this.keywords,
      downloadLink: this.downloadLink,
      category: this.category
    }

    this.http.post(this.addGameApi, data).subscribe(() => {
      alert("Game Added Successfully")
    })

  }

}