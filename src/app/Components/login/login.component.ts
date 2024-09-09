import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Service/auth.service';
import { ToastService } from 'src/app/Core/Service/toast.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports :[CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {



  constructor(private authService: AuthService, private _Router: Router , private _ToastService
:ToastService
) { }


  isloading = false;
  passwordFieldType: boolean = true;

  siginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email 
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.min(8),
      Validators.pattern(/^[A-Z][a-zA-Z0-9@#$%^&+=]{7,}$/)
    ]),

  });

  Sigin(formInfo: FormGroup) {
 
    this.isloading=true;
    const email = this.siginForm.get('email')?.value;
    const password = this.siginForm.get('password')?.value;   
    
    if (email == "mostafaAdmin300@gmail.com" && password =="Mostafa@300") {
      this.authService.Signin(formInfo.value).subscribe((res) => {
        if (res.message === "success") {
          this.isloading=false;
          this._ToastService.showToast("success", "تم التسجيل الدخول بنجاح");
          localStorage.setItem("userToken", res.token);
          this.authService.DecodeUser();
          this._Router.navigate(['/dashbords/dashbord']);
        } 
      },
        (error) => {
          this.isloading=false;
          this._ToastService.showToast ("error" ,error.error.message);        
         
      })
    }
    else {
      this.isloading=false;
      this._ToastService.showToast("error", "هذا الايميل ليس لديه الصلاحيات لدخول");

    }
   
  }
  


  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }


}
