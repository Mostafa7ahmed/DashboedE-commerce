import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartService } from 'src/app/Core/Service/depart.service';
import { ProductService } from 'src/app/Core/Service/product.service';
import { ToastService } from 'src/app/Core/Service/toast.service';

@Component({
  selector: 'app-adddepart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adddepart.component.html',
  styleUrls: ['./adddepart.component.scss']
})
export class AdddepartComponent {
  isloading: boolean = false;

  constructor(
    private _DepartService: DepartService,
    private ToastService: ToastService,
    private _Router: Router
  ) {}

  addProduct: FormGroup = new FormGroup({
    nameDepart: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
    image: new FormControl(null, [Validators.required]),
    numberofdepart: new FormControl(null, [Validators.required]),
    RouteCategory: new FormControl(null, [Validators.required]),

    title: new FormControl(null, [Validators.required]),
  });

  addProductSubmit(addProduct: FormGroup): void {
    if (addProduct.valid) {
      this.isloading = true;
      this._DepartService.addDapartment(addProduct.value).subscribe(
        (response) => {
          this.isloading = false;
          this.ToastService.showToast('success', 'تم اضافة بنجاح');
          this._Router.navigate(['/dashbords/depart']);
        },
        (error) => {
          this.isloading = false;
          this.ToastService.showToast('error', 'لا يوجد مساحه  ');
        }
      );
    } else {
      this.ToastService.showToast('error', 'تأكد من ملء جميع الحقول بشكل صحيح');
    }
  }
}
