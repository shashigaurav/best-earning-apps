import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Game } from '../../models/game'
import { GameService } from '../../services/game'

@Component({
  selector:'manage-games',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./manage-games.html',
  styleUrls:['./manage-games.css']
})
export class ManageGames implements OnInit{

  games:Game[]=[]
  loading=true
  errorMessage=""
  successMessage=""

  constructor(private gameService:GameService){}

  ngOnInit(){
    this.loadGames()
  }

  loadGames(){

    this.loading=true
    this.errorMessage=""

    this.gameService.getGames().subscribe({

      next:(data:Game[])=>{
        this.games=data
        this.loading=false
      },

      error:()=>{
        this.errorMessage="Failed to load games ❌"
        this.loading=false
      }

    })

  }

  deleteGame(id:number){

    if(!confirm("Delete this game?")){
      return
    }

    this.gameService.deleteGame(id).subscribe({

      next:()=>{
        this.successMessage="Game deleted successfully ✅"
        this.loadGames()
      },

      error:()=>{
        this.errorMessage="Delete failed ❌"
      }

    })

  }

}