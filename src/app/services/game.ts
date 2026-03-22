import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Game } from '../models/game'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class GameService {

  api = environment.api + "/admin/games"
  topApi = environment.api + "/admin/top-games"

  constructor(private http: HttpClient) {}

  // GET ALL GAMES
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.api)
  }

  // GET TOP GAMES
  getTopGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.topApi)
  }

  // ADD GAME
  addGame(game: Game) {
    return this.http.post(this.api, game)
  }

  // UPDATE GAME
  updateGame(id: number, game: Game) {
    return this.http.put(`${this.api}/${id}`, game)
  }

  // DELETE GAME
  deleteGame(id: number) {
    return this.http.delete(`${this.api}/${id}`)
  }

}