import {
  Component,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core'

import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { Title, Meta } from '@angular/platform-browser'

import { GameService } from '../../services/game'
import { Game } from '../../models/game'

import { Banner } from '../../components/banner/banner'
import { Footer } from '../../components/footer/footer'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Banner,
    Footer
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home implements OnInit {

  games: Game[] = []
  topGames: Game[] = []
  newGames: Game[] = []
  trendingGames: Game[] = []

  @ViewChild('trending')
  trending!: ElementRef

  constructor(
    private gameService: GameService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {

    this.setSEO()

    this.loadGames()

  }

  /* ========================= */
  /* SEO */
  /* ========================= */

  setSEO(): void {

    this.title.setTitle(
      'Top Earning Apps in India 2026 | Play Games & Earn Money Daily'
    )

    this.meta.updateTag({
      name: 'description',
      content:
        'Discover the best earning apps in India 2026. Play games, complete tasks, and earn real money daily with instant withdrawal apps.'
    })

    this.meta.updateTag({
      name: 'keywords',
      content:
        'top earning apps, play and earn games, money earning apps india, earning games 2026, online earning apps'
    })

    /* OPEN GRAPH */

    this.meta.updateTag({
      property: 'og:title',
      content: 'Top Earning Apps in India 2026'
    })

    this.meta.updateTag({
      property: 'og:description',
      content:
        'Play games and earn money daily using trusted earning apps.'
    })

    this.meta.updateTag({
      property: 'og:type',
      content: 'website'
    })

    this.meta.updateTag({
      property: 'og:image',
      content:
        'https://best-earning-apps.netlify.app/assets/logo.png'
    })

  }

  /* ========================= */
  /* LOAD GAMES */
  /* ========================= */

  loadGames(): void {

    this.gameService.getGames().subscribe({

      next: (data: Game[]) => {

        console.log('HOME API:', data)

        this.games = data || []

        /* TOP GAMES */

        this.topGames = this.games.slice(0, 6)

        /* NEW GAMES */

        this.newGames = this.games.filter(
          (game: Game) =>
            (game.category || '').toLowerCase() === 'new apps'
        )

        /* TRENDING GAMES */

        this.trendingGames = this.games.filter(
          (game: any) => game.isTrending === true
        )

      },

      error: (err) => {

        console.error('Home API Error:', err)

      }

    })

  }

  /* ========================= */
  /* TRENDING SCROLL */
  /* ========================= */

  scrollLeft(): void {

    this.trending?.nativeElement.scrollBy({

      left: -320,
      behavior: 'smooth'

    })

  }

  scrollRight(): void {

    this.trending?.nativeElement.scrollBy({

      left: 320,
      behavior: 'smooth'

    })

  }

}