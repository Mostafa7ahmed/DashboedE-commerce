import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  UserResponse } from '../InterFace/user-data';




@Injectable({
  providedIn: 'root'
})
export class DataUsersService {

  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/users';
  private apiUrOrder = 'https://ecommerce.routemisr.com/api/v1/orders';
  private UrlProduct = "https://66cbd8fd4290b1c4f19b3a54.mockapi.io/Ecommerce/Products";

  constructor(private http: HttpClient) {}

  getUsers(page: number, limit: number = 10): Observable<UserResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<UserResponse>(this.apiUrl, { params });
  }


  searchUsers(name: string, page: number = 1, limit: number = 10): Observable<UserResponse> {
    const params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<UserResponse>(this.apiUrl, { params });
  }



  getOrders(): Observable<any> {
    return this.http.get(this.apiUrOrder);
  }

  getProducts(): Observable<any> {
    return this.http.get(this.UrlProduct);
  }


}
