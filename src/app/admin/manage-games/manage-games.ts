import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';

@Component({
  selector: 'app-manage-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-games.html',
  styleUrls: ['./manage-games.css']
})
export class ManageGamesComponent implements OnInit {

  games: Game[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {

    this.loading = false;

    this.games = [
      {
        id: 1,
        appName: 'TEST APP',
        gameTitle: 'TEST GAME',
        bonus: '100',
        image: 'test.png',
        keywords: 'test',
        downloadLink: 'https://google.com',
        category: 'TEST CATEGORY',
        rating: 5,
        downloads: 1000,
        popular: true
      }
    ];

  }

  deleteGame(id: number): void {
    alert('Delete Test: ' + id);
  }

}