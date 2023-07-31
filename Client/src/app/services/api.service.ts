import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:5050/api';
  
  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  getRents(){
    return this.http.get<any[]>(`${this.baseUrl}/rents`);
  }
  createRent(craftObj: any){
      return this.http.post<any>(`${this.baseUrl}/rents/create`, craftObj);
  }
  getOneRent(id: any){
    return this.http.get<any>(`${this.baseUrl}/rents/details/${id}`, );
  }

  editRent(id: string, editObj: any){
    return this.http.post<any>(`${this.baseUrl}/rents/${id}/edit`, editObj)
  }
  deleteRent(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/rents/${id}/delete`);
  }

  makePost(postObj: any){
    return this.http.post<any>(`${this.baseUrl}/posts`, postObj);
  }

  infoPost(rentId: string, updateRent: any){
    return this.http.post<any>(`${this.baseUrl}/rents/${rentId}/link`, {rentId, updateRent});
  }
}
