import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { GameService } from '../../services/game'

@Component({
  selector: 'app-all-apps',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-apps.html',
  styleUrls: ['./all-apps.css']
})

export class AllApps implements OnInit {

  games: any[] = []

  constructor(private gameService: GameService) {}

  ngOnInit(): void {

    this.gameService.getGames().subscribe({
      next: (data: any[]) => {

        console.log("All Apps Data:", data)

        this.games = data

      },

      error: (err) => {
        console.error("API Error:", err)
      }

    })

  }

}