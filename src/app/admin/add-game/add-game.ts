import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-game.html',
  styleUrls: ['./add-game.css']
})
export class AddGame {

  appName = '';
  gameTitle = '';
  bonus = '';
  imageUrl = '';
  keywords = '';
  downloadLink = '';
  category = 'all apps';

  loading = false;
  message = '';
  error = '';

  addGameApi =
    'https://best-earning-apps-backend.onrender.com/admin/games';

  constructor(private http: HttpClient) {}

  addGame() {

    if (!this.appName || !this.downloadLink) {

      this.error = 'Fill required fields ❌';
      return;

    }

    if (!this.imageUrl) {

      this.error = 'Enter image URL ❌';
      return;

    }

    this.loading = true;

    this.message = '';
    this.error = '';

    const data = {

      appName: this.appName,
      gameTitle: this.gameTitle,
      bonus: this.bonus,
      image: this.imageUrl,
      keywords: this.keywords,
      downloadLink: this.downloadLink,
      category: this.category

    };

    this.http.post(this.addGameApi, data).subscribe({

      next: () => {

        this.loading = false;

        this.message = 'Game Added Successfully ✅';
        this.error = '';

        this.appName = '';
        this.gameTitle = '';
        this.bonus = '';
        this.imageUrl = '';
        this.keywords = '';
        this.downloadLink = '';
        this.category = 'all apps';

      },

      error: (err) => {

        console.log('ADD GAME ERROR:', err);

        this.loading = false;

        this.error = 'Failed to add game ❌';

      }

    });

  }

}