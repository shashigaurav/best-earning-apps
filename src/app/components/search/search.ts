import { Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {

  searchText: string = ''
  private timeout: any

  @Output() searchEvent = new EventEmitter<string>()

  // 🔥 DEBOUNCE SEARCH
  onInput(){

    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.searchEvent.emit(this.searchText)
    }, 300) // 300ms delay
  }

}