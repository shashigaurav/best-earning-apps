import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Game } from '../models/game'

@Injectable({
providedIn:'root'
})

export class GameService{

api="http://localhost:8080/admin/games"
topApi="http://localhost:8080/admin/top-games"

constructor(private http:HttpClient){}

/* GET ALL GAMES */

getGames():Observable<Game[]>{
return this.http.get<Game[]>(this.api)
}

/* GET TOP GAMES */

getTopGames():Observable<Game[]>{
return this.http.get<Game[]>(this.topApi)
}

/* ADD GAME */

addGame(game:Game){
return this.http.post(this.api,game)
}

/* UPDATE GAME */

updateGame(id:number,game:Game){
return this.http.put(`${this.api}/${id}`,game)
}

/* DELETE GAME */

deleteGame(id:number){
return this.http.delete(`${this.api}/${id}`)
}

}