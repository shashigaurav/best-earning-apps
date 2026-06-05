import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private gameService: GameService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.gameService.getGames().subscribe({

      next: (data: Game[]) => {

        this.games = data;
        this.loading = false;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error('LOAD ERROR:', err);

        this.errorMessage = 'Failed to load games ❌';
        this.loading = false;

        this.cdr.detectChanges();

      }

    });

  }

  deleteGame(id: number): void {

    if (!confirm('Delete this game?')) {
      return;
    }

    this.gameService.deleteGame(id).subscribe({

      next: () => {
        this.loadGames();
      },

      error: (err) => {
        console.error('DELETE ERROR:', err);
      }

    });

  }

}