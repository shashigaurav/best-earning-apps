import { Component, ElementRef, ViewChild, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { GameService } from '../../services/game'
import { Game } from '../../models/game'

import { Banner } from '../../components/banner/banner'
import { Footer } from '../../components/footer/footer'

@Component({
selector:'app-home',
standalone:true,
imports:[CommonModule,RouterModule,Banner,Footer],
templateUrl:'./home.html',
styleUrls:['./home.css']
})

export class Home implements OnInit{

games:Game[]=[]
topGames:Game[]=[]
newGames:Game[]=[]

@ViewChild('trending') trending!:ElementRef

constructor(private gameService:GameService){}

ngOnInit():void{

this.gameService.getGames().subscribe((data:Game[])=>{

this.games=data

this.topGames=data.slice(0,6)

this.newGames=data.filter((g:Game)=>g.category==='new apps')

})

}

/* TRENDING SCROLL */

scrollLeft():void{

if(this.trending){

this.trending.nativeElement.scrollBy({
left:-300,
behavior:'smooth'
})

}

}

scrollRight():void{

if(this.trending){

this.trending.nativeElement.scrollBy({
left:300,
behavior:'smooth'
})

}

}

}