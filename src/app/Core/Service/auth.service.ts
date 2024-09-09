import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem("userToken") != null) {
      this.DecodeUser();
    }
   }
   APiUrl: string = "https://ecommerce.routemisr.com/api/v1/auth/";
  userInfo=new BehaviorSubject(null);

  Signin(user: object):Observable<any>{
    return this._HttpClient.post(this.APiUrl +"signin",user)
  }
 


  DecodeUser() {
    const encode = localStorage.getItem("userToken");
    if (encode != null) {
      const decoded:any = jwtDecode(encode);
      this.userInfo.next(decoded)

    }
      
  }

  logOut():void {
    localStorage.removeItem("userToken");
    this.userInfo.next(null)
    this._Router.navigate(['/login'])


  }


}
