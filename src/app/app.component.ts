import { Component } from '@angular/core';
import { AuthService } from './Core/Service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _AuthService:AuthService ){}
  title = 'dashbord';
  

}
