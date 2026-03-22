import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { GameService } from '../../services/game'

@Component({
  standalone: true,
  imports: [CommonModule],
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

    // simple admin check
    const admin = localStorage.getItem('admin')

    if (!admin) {
      this.router.navigate(['/admin/login'])
      return
    }

    this.gameService.getGames().subscribe({
      next: (data: any[]) => {

        this.totalGames = data.length

        this.newApps = data.filter(
          (g: any) => g.category === 'new apps'
        ).length

      },
      error: (err) => {
        console.error("Game API error:", err)
      }
    })

  }

  logout() {

    localStorage.removeItem('admin')
    this.router.navigate(['/admin/login'])

  }

}