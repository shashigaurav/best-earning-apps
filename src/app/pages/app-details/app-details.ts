import { Component, OnInit, Inject } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { GameService } from '../../services/game'
import { Game } from '../../models/game'
import { CommonModule, DOCUMENT } from '@angular/common'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector:'app-details',
  standalone:true,
  imports:[CommonModule, RouterModule],
  templateUrl:'./app-details.html',
  styleUrls:['./app-details.css']
})

export class AppDetails implements OnInit {

  game!: Game
  relatedGames: Game[] = []

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(){

    const id = Number(this.route.snapshot.params['id'])

    this.gameService.getGames().subscribe((data:Game[])=>{

      const foundGame = data.find(g => g.id == id)

      if(!foundGame){
        console.error('Game not found')
        return
      }

      this.game = foundGame

      this.relatedGames = data
        .filter(g => g.id != id)
        .slice(0,4)

      // 🔥 SEO META
      this.title.setTitle(`${this.game.appName} Earning App Review 2026 | Real or Fake`)

      this.meta.updateTag({
        name:'description',
        content:`${this.game.appName} earning app full review. Earn real money, bonus ₹${this.game.bonus}, withdrawal proof and user experience.`
      })

      this.meta.updateTag({
        name:'keywords',
        content:`${this.game.appName}, earning app, real earning apps, money earning apps 2026`
      })

      // 🔥 SCHEMA
      this.addSchema(this.game)

    })

  }

  // 🔥 SCHEMA FUNCTION
  addSchema(game: Game){

    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": game.appName,
      "operatingSystem": "Android",
      "applicationCategory": "GameApplication",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": game.rating,
        "reviewCount": game.downloads
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    }

    const script = this.document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)

    this.document.head.appendChild(script)
  }

}