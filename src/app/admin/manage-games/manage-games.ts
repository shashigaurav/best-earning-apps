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

constructor(private gameService:GameService){}

ngOnInit(){

this.loadGames()

}

loadGames(){

this.loading=true

this.gameService.getGames().subscribe({

next:(data:Game[])=>{

this.games=data
this.loading=false

},

error:(error)=>{

console.error(error)
this.errorMessage="Failed to load games"
this.loading=false

}

})

}

deleteGame(id:number){

if(!confirm("Are you sure you want to delete this game?")){
return
}

this.gameService.deleteGame(id).subscribe({

next:()=>{

alert("Game Deleted Successfully")
this.loadGames()

},

error:(error)=>{

console.error(error)
alert("Delete failed")

}

})

}

}