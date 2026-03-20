import { Component, ElementRef, ViewChild, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { GameService } from '../../services/game'
import { Game } from '../../models/game'

import { Banner } from '../../components/banner/banner'
import { Footer } from '../../components/footer/footer'

import { Title, Meta } from '@angular/platform-browser'

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

  constructor(
    private gameService:GameService,
    private title:Title,
    private meta:Meta
  ){}

  ngOnInit():void{

    // 🔥 SEO META TAGS
    this.title.setTitle('Top Earning Apps in India 2026 | Earn Money Daily')

    this.meta.updateTag({
      name:'description',
      content:'Best earning apps in India 2026. Earn money online without investment using trusted apps with real proof and instant withdrawal.'
    })

    this.meta.updateTag({
      name:'keywords',
      content:'earning apps, money earning apps, earn money online, best apps 2026'
    })

    this.gameService.getGames().subscribe((data:Game[])=>{

      this.games=data

      this.topGames=data.slice(0,6)

      this.newGames=data.filter((g:Game)=>g.category==='new apps')

    })

  }

  /* TRENDING SCROLL */

  scrollLeft():void{
    this.trending?.nativeElement.scrollBy({ left:-300, behavior:'smooth' })
  }

  scrollRight():void{
    this.trending?.nativeElement.scrollBy({ left:300, behavior:'smooth' })
  }

}