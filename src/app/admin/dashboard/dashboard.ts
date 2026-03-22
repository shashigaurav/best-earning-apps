import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Router } from '@angular/router'
import { GameService } from '../../services/game'

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  totalGames: number = 0
  newApps: number = 0

  constructor(
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit() {

    const admin = localStorage.getItem('admin')

    if (!admin) {
      this.router.navigate(['/admin/login'])
      return
    }

    this.loadGames()

  }

  /* LOAD GAMES */

  loadGames() {

    this.gameService.getGames().subscribe({

      next: (data:any) => {

        console.log("Games API Response:", data)

        if(!Array.isArray(data)){
          console.error("Invalid API response")
          return
        }

        this.totalGames = data.length

        this.newApps = data.filter(
          (g:any) => (g.category || '').toLowerCase() === 'new apps'
        ).length

      },

      error: (err) => {
        console.error("Game API error:", err)
      }

    })

  }

  /* LOGOUT */

  logout() {
    localStorage.removeItem('admin')
    this.router.navigate(['/admin/login'])
  }

}