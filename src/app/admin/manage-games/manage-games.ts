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

    this.loadGames();

  }

  /* LOAD GAMES */
  loadGames(): void {

    this.loading = true;

    this.errorMessage = '';

    this.successMessage = '';

    this.gameService.getGames().subscribe({

      next: (data: Game[]) => {

        console.log('Games API Response:', data);

        this.games = data || [];

        this.loading = false;

      },

      error: (err) => {

        console.error('LOAD ERROR:', err);

        this.errorMessage = 'Failed to load games ❌';

        this.loading = false;

      }

    });

  }

  /* DELETE GAME */
  deleteGame(id: number): void {

    const confirmDelete = confirm('Delete this game?');

    if (!confirmDelete) {
      return;
    }

    this.gameService.deleteGame(id).subscribe({

      next: () => {

        this.successMessage =
          'Game deleted successfully ✅';

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