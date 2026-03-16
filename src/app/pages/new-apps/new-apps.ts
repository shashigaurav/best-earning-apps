import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game';
import { Game } from '../../models/game';
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

  games: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data: Game[]) => {
      this.games = data.filter((g: Game) => g.category === "new apps");
    });
  }

}