import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartService {

  constructor(private HttpClient:HttpClient) { }
  private Url = "https://66d266e4184dce1713cd8067.mockapi.io/Ecommerce/department";

  getDepartments(): Observable<any> {
    return this.HttpClient.get(this.Url);
  }

  
  getSearchDepartment(search :string): Observable<any> {
    return this.HttpClient.get(`${this.Url}?search=${search}`);
  }


  
  deleteItem(id: string) {
    const url = `${this.Url}/${id}`; 
    return this.HttpClient.delete(url);
  }

  addDapartment(Product: object):Observable<any>{
    return this.HttpClient.post(this.Url ,Product)
  }


  updateDepartment(id: string, product: any): Observable<any> {
    return this.HttpClient.put(`${this.Url}/${id}`, product);
  }

  getDepartmenById(id: string): Observable<any> {
    return this.HttpClient.get(`${this.Url}/${id}`);
  }

}
