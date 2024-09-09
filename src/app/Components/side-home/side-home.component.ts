import { ToastService } from './../../Core/Service/toast.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/Core/Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-home',
  standalone: true,
  imports:[RouterLink , RouterModule , CommonModule],
  templateUrl: './side-home.component.html',
  styleUrls: ['./side-home.component.scss']
})
export class SideHomeComponent {
  showDepart = false;
  showProduct = false;

  constructor( private _AuthService:AuthService , private ToastService: ToastService) {}

  callLogOut() {
    this.ToastService.showToast("success", "تم تسجيل خروجك بنجاح");
    this._AuthService.logOut()
  }

  toggleProdct() {
    this.showProduct = !this.showProduct;
  }

  toggleDepart() {
    this.showDepart = !this.showDepart;
  }
}
