import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrls: ['./banner.css']
})

export class Banner implements OnInit {

  banners = [
    'assets/banner1.png'
  ]

  current = 0

  ngOnInit() {

    setInterval(() => {
      this.current = (this.current + 1) % this.banners.length
    }, 3000)

  }

}