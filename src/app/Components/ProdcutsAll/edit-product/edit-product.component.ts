import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/Core/Service/product.service';
import { ToastService } from 'src/app/Core/Service/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productId: string;
  isloading: boolean = false;
  editProduct!: FormGroup; // Non-null assertion

  constructor(
    private _ProductService: ProductService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private ToastService: ToastService
  ) {
    this.productId = this._Route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this._ProductService.getProductById(this.productId).subscribe((product) => {
      this.editProduct = new FormGroup({ 
        nameProduact: new FormControl(product.nameProduact, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ]),
        Image: new FormControl(product.Image, [Validators.required]),
        price: new FormControl(product.price, [Validators.required]),
        Qty: new FormControl(product.Qty, [Validators.required]),
        dec: new FormControl(product.dec, [Validators.required]),
        subTitle: new FormControl(product.subTitle, [Validators.required]),
        Title: new FormControl(product.Title, [Validators.required]),
        depart: new FormControl(product.depart, [Validators.required]),
        trans: new FormControl(product.trans, [Validators.required]),
      });
    });
  }

  updateProduct(): void {
    if (this.editProduct.valid) {
      this.isloading = true;
      this._ProductService.updateProduct(this.productId, this.editProduct.value).subscribe(
        (response) => {
          console.log()
          this.isloading = false;
          this.ToastService.showToast('success', 'تم التحديث بنجاح');
          this._Router.navigate(['/dashbords/products']);
        },
        (error) => {
          this.isloading = false;
          
          this.ToastService.showToast('error', 'حدث خطأ');
        }
      );
    }
  }
}
