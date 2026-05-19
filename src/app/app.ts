import { Component } from '@angular/core'

import {
  Router,
  RouterOutlet,
  NavigationEnd
} from '@angular/router'

import { filter } from 'rxjs/operators'

import {
  Title,
  Meta
} from '@angular/platform-browser'

import { Header } from './components/header/header'

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [
    RouterOutlet,
    Header
  ],

  templateUrl: './app.html',

  styleUrls: ['./app.css']
})

export class App {

  constructor(

    private router: Router,

    private title: Title,

    private meta: Meta

  ) {

    /* ========================= */
    /* SCROLL TOP ON ROUTE */
    /* ========================= */

    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationEnd
        )
      )
      .subscribe(() => {

        window.scrollTo({

          top: 0,

          behavior: 'smooth'

        })

      })

    /* ========================= */
    /* DEFAULT SEO */
    /* ========================= */

    this.title.setTitle(
      'Best Earning Apps in India'
    )

    this.meta.updateTag({

      name: 'description',

      content:
        'Discover trusted earning apps, referral apps, and play-to-earn games in India.'

    })

  }

}