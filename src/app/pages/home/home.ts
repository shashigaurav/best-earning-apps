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

    /* 🔥 SEO META */

    this.title.setTitle(
      'Top Earning Apps in India 2026 | Best Money Earning Apps'
    )

    this.meta.updateTag({
      name:'description',
      content:'Best earning apps in India 2026. Earn money online daily without investment using trusted apps with instant withdrawal.'
    })

    this.meta.updateTag({
      name:'keywords',
      content:'earning apps, money earning apps, best earning apps 2026, earn money online'
    })


    /* 🔥 GET GAMES */

    this.gameService.getGames().subscribe({

      next:(data:Game[])=>{

        console.log("HOME API:",data)

        this.games=data

        // Trending apps
        this.topGames=data.slice(0,6)

        // New apps
        this.newGames=data.filter(
          (g:Game)=> (g.category || '').toLowerCase() === 'new apps'
        )

      },

      error:(err)=>{
        console.error("Home API error:",err)
      }

    })

  }

  /* TRENDING SCROLL */

  scrollLeft():void{
    this.trending?.nativeElement.scrollBy({
      left:-300,
      behavior:'smooth'
    })
  }

  scrollRight():void{
    this.trending?.nativeElement.scrollBy({
      left:300,
      behavior:'smooth'
    })
  }

}