import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrls: ['./banner.css']
})

export class Banner implements OnInit, OnDestroy {

  banners = [
    'assets/banner1.png',
    'assets/banner2.png',
    'assets/banner3.png'
  ]

  current = 0
  intervalId: any

  ngOnInit() {
    this.startSlider()
  }

  startSlider() {
    this.intervalId = setInterval(() => {
      this.nextSlide()
    }, 3000)
  }

  nextSlide() {
    this.current = (this.current + 1) % this.banners.length
  }

  prevSlide() {
    this.current =
      (this.current - 1 + this.banners.length) % this.banners.length
  }

  goToSlide(index: number) {
    this.current = index
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

}