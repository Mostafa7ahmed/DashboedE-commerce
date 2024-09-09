import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _HttpClient: HttpClient) { }
  
  private API_URL = "https://66d266e4184dce1713cd8067.mockapi.io/Ecommerce/Message"


  GetMessage(): Observable<any> {
    return this._HttpClient.get(this.API_URL);
  }

  getSearchMessage(search :string): Observable<any> {
    return this._HttpClient.get(`${this.API_URL}?search=${search}`);
  }

}
