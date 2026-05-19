import { Component } from '@angular/core'

import { CommonModule } from '@angular/common'

import {
  Router,
  RouterModule,
  NavigationEnd
} from '@angular/router'

import { filter } from 'rxjs/operators'

import { SearchComponent }
from '../search/search'

@Component({
  selector: 'app-header',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    SearchComponent
  ],

  templateUrl: './header.html',

  styleUrls: ['./header.css']
})

export class Header {

  /* ========================= */
  /* MENU */
  /* ========================= */

  menuOpen: boolean = false

  constructor(
    private router: Router
  ) {

    /* AUTO CLOSE MENU */

    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationEnd
        )
      )
      .subscribe(() => {

        this.menuOpen = false

      })

  }

  /* ========================= */
  /* TOGGLE MENU */
  /* ========================= */

  toggleMenu(): void {

    this.menuOpen =
      !this.menuOpen

  }

  /* ========================= */
  /* CLOSE MENU */
  /* ========================= */

  closeMenu(): void {

    this.menuOpen = false

  }

}