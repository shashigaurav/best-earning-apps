import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core'

import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrls: ['./banner.css']
})

export class Banner implements OnInit, OnDestroy {

  /* ========================= */
  /* BANNERS */
  /* ========================= */

  banners: string[] = [

    'assets/banner1.png',
    'assets/banner2.png',
    'assets/banner3.png'

  ]

  current: number = 0

  intervalId: any

  /* ========================= */
  /* INIT */
  /* ========================= */

  ngOnInit(): void {

    this.startSlider()

  }

  /* ========================= */
  /* AUTO SLIDER */
  /* ========================= */

  startSlider(): void {

    this.intervalId = setInterval(() => {

      this.nextSlide()

    }, 4000)

  }

  /* ========================= */
  /* NEXT */
  /* ========================= */

  nextSlide(): void {

    this.current =
      (this.current + 1) % this.banners.length

  }

  /* ========================= */
  /* PREVIOUS */
  /* ========================= */

  prevSlide(): void {

    this.current =
      (this.current - 1 + this.banners.length)
      % this.banners.length

  }

  /* ========================= */
  /* DOT CLICK */
  /* ========================= */

  goToSlide(index: number): void {

    this.current = index

  }

  /* ========================= */
  /* TRACK BY */
  /* ========================= */

  trackByIndex(index: number): number {

    return index

  }

  /* ========================= */
  /* DESTROY */
  /* ========================= */

  ngOnDestroy(): void {

    if (this.intervalId) {

      clearInterval(this.intervalId)

    }

  }

}