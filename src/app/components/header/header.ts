import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule, Router } from '@angular/router'
import { GameService } from '../../services/game'
import { Game } from '../../models/game'

@Component({
selector:'app-header',
standalone:true,
imports:[CommonModule,FormsModule,RouterModule],
templateUrl:'./header.html',
styleUrls:['./header.css']
})

export class Header{

menuOpen=false
searchText=""

games:Game[]=[]
results:Game[]=[]

constructor(
private gameService:GameService,
private router:Router
){}

ngOnInit(){

this.gameService.getGames().subscribe((data:Game[])=>{
this.games=data
})

}

/* MENU */

toggleMenu(){
this.menuOpen=!this.menuOpen
}

/* LIVE SEARCH */

liveSearch(){

const text=this.searchText.toLowerCase()

if(!text){
this.results=[]
return
}

this.results=this.games
.filter(g=>g.appName.toLowerCase().includes(text))
.slice(0,5)

}

/* ENTER SEARCH */

search(){

const text=this.searchText.toLowerCase()

if(!text){
return
}

const match=this.games.find(g=>g.appName.toLowerCase().includes(text))

if(match){
this.router.navigate(['/app',match.id])
}

this.searchText=""
this.results=[]

}

/* CLEAR SEARCH */

clearSearch(){

this.searchText=""
this.results=[]

}

/* OPEN APP */

openApp(id:number){

this.results=[]
this.searchText=""

this.router.navigate(['/app',id])

}

}