import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { GameService } from '../../services/game'
import { Game } from '../../models/game'
import { CommonModule } from '@angular/common'

@Component({
selector:'app-details',
standalone:true,
imports:[CommonModule],
templateUrl:'./app-details.html',
styleUrls:['./app-details.css']
})

export class AppDetails{

game!:Game
relatedGames:Game[]=[]

constructor(
private route:ActivatedRoute,
private gameService:GameService
){}

ngOnInit(){

const id=Number(this.route.snapshot.params['id'])

this.gameService.getGames().subscribe((data:Game[])=>{

this.game=data.find(g=>g.id==id)!

this.relatedGames=data.filter(g=>g.id!=id).slice(0,4)

})

}

}