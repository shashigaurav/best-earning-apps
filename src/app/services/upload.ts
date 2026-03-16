import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn:'root'
})

export class UploadService{

api="http://localhost:8080/admin/upload"

constructor(private http:HttpClient){}

upload(file:any){

const formData=new FormData()

formData.append("file",file)

return this.http.post(this.api,formData)

}

}