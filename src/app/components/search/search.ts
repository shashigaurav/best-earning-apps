import {
  Component,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core'

import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})

export class SearchComponent implements OnDestroy {

  /* ========================= */
  /* SEARCH TEXT */
  /* ========================= */

  searchText: string = ''

  timeout: any

  /* ========================= */
  /* OUTPUT EVENT */
  /* ========================= */

  @Output()
  searchEvent =
    new EventEmitter<string>()

  /* ========================= */
  /* SEARCH INPUT */
  /* ========================= */

  onInput(): void {

    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {

      this.searchEvent.emit(
        this.searchText.trim()
      )

    }, 300)

  }

  /* ========================= */
  /* CLEAR SEARCH */
  /* ========================= */

  clearSearch(): void {

    this.searchText = ''

    this.searchEvent.emit('')

  }

  /* ========================= */
  /* DESTROY */
  /* ========================= */

  ngOnDestroy(): void {

    if (this.timeout) {

      clearTimeout(this.timeout)

    }

  }

}