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

  loadGames(): void {

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    console.log('Loading started...');

    this.gameService.getGames().subscribe({

      next: (data: any) => {

        console.log('Games API Response:', data);

        setTimeout(() => {

          this.games = Array.isArray(data) ? data : [];

          this.loading = false;

          console.log('Games Count:', this.games.length);
          console.log('Loading finished:', this.loading);

        }, 0);

      },

      error: (err) => {

        console.error('LOAD ERROR:', err);

        this.errorMessage = 'Failed to load games ❌';

        this.loading = false;

        console.log('Loading finished with error:', this.loading);

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