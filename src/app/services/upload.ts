import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  // backend upload API
  api = environment.api + "/admin/upload"

  constructor(private http: HttpClient) {}

  upload(file: any) {

    const formData = new FormData()

    formData.append("file", file)

    return this.http.post(this.api, formData)

  }

}