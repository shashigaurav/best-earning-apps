import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
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

  totalGames = 0
  newApps = 0

  constructor(
    private router: Router,
    private gameService: GameService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {

    const admin = localStorage.getItem('admin')

    if (!admin) {
      this.router.navigate(['/admin/login'])
      return
    }

    this.loadGames()

  }

  loadGames(){

    this.gameService.getGames().subscribe({

      next: (data:any[]) => {

        console.log("API DATA:", data)

        if(!Array.isArray(data)){
          return
        }

        this.totalGames = data.length

        this.newApps = data.filter(
          (g:any) => (g.category || '').toLowerCase() === 'new apps'
        ).length

        this.cd.detectChanges()   // 🔥 force UI update

      },

      error: (err) => {
        console.error("Game API error:", err)
      }

    })

  }

  logout(){
    localStorage.removeItem('admin')
    this.router.navigate(['/admin/login'])
  }

}