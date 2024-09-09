import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Core/Service/product.service';
import { ToastService } from 'src/app/Core/Service/toast.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  isloading: boolean = false;

  constructor(
    private _ProductService: ProductService,
    private ToastService: ToastService,
    private _Router: Router
  ) {}

  addProduct: FormGroup = new FormGroup({
    nameProduact: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
    Image: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    Qty: new FormControl(null, [Validators.required]),
    dec: new FormControl(null, [Validators.required]),
    subTitle: new FormControl(null, [Validators.required]),
    Title: new FormControl(null, [Validators.required]),
    depart: new FormControl(null, [Validators.required]),
    trans: new FormControl(null, [Validators.required]),
  });

  addProductSubmit(addProduct: FormGroup): void {
    if (addProduct.valid) {
      this.isloading = true;
      this._ProductService.AddProducrs(addProduct.value).subscribe(
        (response) => {
          this.isloading = false;
          this.ToastService.showToast('success', 'تم اضافة بنجاح');
          this._Router.navigate(['/dashbords/products']);
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
