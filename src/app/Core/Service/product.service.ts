import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private HttpClient: HttpClient) { }
  private Url = "https://66cbd8fd4290b1c4f19b3a54.mockapi.io/Ecommerce/Products";

  getProducts(): Observable<any> {
    return this.HttpClient.get(this.Url);
  }

  
  getSearchProducts(search :string): Observable<any> {
    return this.HttpClient.get(`${this.Url}?search=${search}`);
  }


  
  deleteItem(id: number) {
    const url = `${this.Url}/${id}`; 
    return this.HttpClient.delete(url);
  }

  AddProducrs(Product: object):Observable<any>{
    return this.HttpClient.post(this.Url ,Product)
  }


  updateProduct(id: string, product: any): Observable<any> {
    return this.HttpClient.put(`${this.Url}/${id}`, product);
  }

  getProductById(id: string): Observable<any> {
    return this.HttpClient.get(`${this.Url}/${id}`);
  }

}
