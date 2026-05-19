import {
  Component,
  OnInit,
  Inject
} from '@angular/core'

import {
  ActivatedRoute,
  RouterModule
} from '@angular/router'

import {
  CommonModule,
  DOCUMENT
} from '@angular/common'

import {
  Title,
  Meta
} from '@angular/platform-browser'

import { GameService } from '../../services/game'
import { Game } from '../../models/game'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './app-details.html',
  styleUrls: ['./app-details.css']
})

export class AppDetails implements OnInit {

  game!: Game

  relatedGames: Game[] = []

  backendUrl =
    'https://best-earning-apps-backend.onrender.com/uploads/'

  loading: boolean = true

  constructor(

    private route: ActivatedRoute,

    private gameService: GameService,

    private title: Title,

    private meta: Meta,

    @Inject(DOCUMENT)
    private document: Document

  ) {}

  ngOnInit(): void {

    this.loadGame()

  }

  /* ========================= */
  /* LOAD GAME */
  /* ========================= */

  loadGame(): void {

    const id = Number(
      this.route.snapshot.params['id']
    )

    this.gameService.getGames().subscribe({

      next: (data: Game[]) => {

        const foundGame = data.find(
          game => game.id == id
        )

        if (!foundGame) {

          console.error('Game not found')

          this.loading = false

          return

        }

        this.game = foundGame

        /* RELATED GAMES */

        this.relatedGames = data
          .filter(game => game.id != id)
          .slice(0, 4)

        /* SEO */

        this.setSEO()

        /* SCHEMA */

        this.addSchema()

        this.loading = false

      },

      error: (err) => {

        console.error(
          'Details API Error:',
          err
        )

        this.loading = false

      }

    })

  }

  /* ========================= */
  /* SEO */
  /* ========================= */

  setSEO(): void {

    this.title.setTitle(
      `${this.game.appName} Earning App Review 2026 | Real or Fake`
    )

    this.meta.updateTag({

      name: 'description',

      content:
        `${this.game.appName} earning app full review. Earn real money, bonus ₹${this.game.bonus}, withdrawal proof, features, and user experience.`

    })

    this.meta.updateTag({

      name: 'keywords',

      content:
        `${this.game.appName}, earning app, money earning apps, real earning apps 2026, play and earn`

    })

    /* OPEN GRAPH */

    this.meta.updateTag({

      property: 'og:title',

      content:
        `${this.game.appName} Earning App Review`

    })

    this.meta.updateTag({

      property: 'og:description',

      content:
        `Check ${this.game.appName} earning app review, bonus, rewards, and withdrawal details.`

    })

    this.meta.updateTag({

      property: 'og:image',

      content:
        this.backendUrl + this.game.image

    })

    this.meta.updateTag({

      property: 'og:type',

      content: 'website'

    })

  }

  /* ========================= */
  /* JSON-LD SCHEMA */
  /* ========================= */

  addSchema(): void {

    const schema = {

      "@context": "https://schema.org",

      "@type": "SoftwareApplication",

      "name": this.game.appName,

      "operatingSystem": "Android",

      "applicationCategory":
        "GameApplication",

      "image":
        this.backendUrl + this.game.image,

      "offers": {

        "@type": "Offer",

        "price": "0",

        "priceCurrency": "INR"

      },

      "aggregateRating": {

        "@type": "AggregateRating",

        "ratingValue":
          this.game.rating || 4.5,

        "reviewCount":
          this.game.downloads || 1000

      }

    }

    const script =
      this.document.createElement('script')

    script.type = 'application/ld+json'

    script.text =
      JSON.stringify(schema)

    this.document.head.appendChild(script)

  }

}