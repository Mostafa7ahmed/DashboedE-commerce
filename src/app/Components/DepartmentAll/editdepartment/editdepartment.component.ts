import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartService } from 'src/app/Core/Service/depart.service';
import { ToastService } from 'src/app/Core/Service/toast.service';

@Component({
  selector: 'app-editdepartment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editdepartment.component.html',
  styleUrls: ['./editdepartment.component.scss']
})
export class EditdepartmentComponent implements OnInit {
  productId: string;
  isloading: boolean = false;
  editProduct!: FormGroup; // Non-null assertion

  constructor(
    private _DepartService: DepartService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private ToastService: ToastService
  ) {
    this.productId = this._Route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this._DepartService.getDepartmenById(this.productId).subscribe((product) => {
      this.editProduct = new FormGroup({ 
        nameDepart: new FormControl(product.nameDepart, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ]),
        numberofdepart: new FormControl(product.numberofdepart, [Validators.required]),
        image: new FormControl(product.image, [Validators.required]),

        title: new FormControl(product.title, [Validators.required]),
      });
    });
  }

  updateProduct(): void {
    if (this.editProduct.valid) {
      this.isloading = true;
      this._DepartService.updateDepartment(this.productId, this.editProduct.value).subscribe(
        (response) => {
          console.log()
          this.isloading = false;
          this.ToastService.showToast('success', 'تم التحديث بنجاح');
          this._Router.navigate(['/dashbords/depart']);
        },
        (error) => {
          this.isloading = false;
          
          this.ToastService.showToast('error', 'حدث خطأ');
        }
      );
    }
  }
}
