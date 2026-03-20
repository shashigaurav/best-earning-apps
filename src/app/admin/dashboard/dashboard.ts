import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { GameService } from '../../services/game'

@Component({
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./dashboard.html',
  styleUrls:['./dashboard.css']
})
export class Dashboard implements OnInit{

  totalGames = 0
  newApps = 0

  constructor(
    private router:Router,
    private gameService:GameService
  ){}

  ngOnInit(){

    this.gameService.getGames().subscribe(data=>{
      this.totalGames = data.length
      this.newApps = data.filter(g=>g.category === 'new apps').length
    })

  }

  logout(){
    localStorage.removeItem('admin')
    this.router.navigate(['/admin/login'])
  }

}