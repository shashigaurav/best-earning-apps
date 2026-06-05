import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Game } from '../../models/game';
import { GameService } from '../../services/game';

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

  constructor(private gameService: GameService) {}

  ngOnInit(): void {

    console.log('ManageGamesComponent Loaded');

    this.loadGames();
  }

  loadGames(): void {

    console.log('loadGames() called');

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.gameService.getGames().subscribe({

      next: (data: Game[]) => {

        console.log('API DATA:', data);
        console.log('DATA LENGTH:', data.length);

        this.games = data;

        console.log('AFTER ASSIGN:', this.games.length);
        console.log('GAMES ARRAY:', this.games);

        this.loading = false;

        console.log('LOADING:', this.loading);

      },

      error: (err) => {

        console.error('LOAD ERROR:', err);

        this.errorMessage = 'Failed to load games ❌';

        this.loading = false;

        console.log('LOADING:', this.loading);

      }

    });

  }

  deleteGame(id: number): void {

    const confirmDelete = confirm('Delete this game?');

    if (!confirmDelete) {
      return;
    }

    this.gameService.deleteGame(id).subscribe({

      next: () => {

        this.successMessage = 'Game deleted successfully ✅';
        this.errorMessage = '';

        this.loadGames();

      },

      error: (err) => {

        console.error('DELETE ERROR:', err);

        this.errorMessage = 'Delete failed ❌';

      }

    });

  }

}