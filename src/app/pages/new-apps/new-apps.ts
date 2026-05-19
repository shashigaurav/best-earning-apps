import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'new-apps',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './new-apps.html',
  styleUrls: ['./new-apps.css']
})

export class NewApps implements OnInit {

  games: any[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {

    this.gameService.getGames().subscribe({

      next: (data: any[]) => {

        console.log("New Apps Data:", data);

        this.games = data.filter(
          (g: any) =>
            g.category &&
            g.category.toLowerCase() === 'new apps'
        );

      },

      error: (err) => {
        console.error("API Error:", err);
      }

    });

  }

}