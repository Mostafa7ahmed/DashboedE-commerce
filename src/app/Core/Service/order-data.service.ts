import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {


  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/orders';

  constructor(private http: HttpClient) {}

  getOrders(page: number, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(this.apiUrl, { params });
  }


}
