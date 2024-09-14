import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartMent } from 'src/app/Core/InterFace/depart-ment';
import { ConfirmService } from 'src/app/Core/Service/confirm.service';
import { DepartService } from 'src/app/Core/Service/depart.service';
import { ProductService } from 'src/app/Core/Service/product.service';
import Swal from 'sweetalert2';
@Component({

  selector: 'app-depart',
  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './depart.component.html',
  styleUrls: ['./depart.component.scss']
})
export class DepartComponent {



  department: DepartMent[] = [];
  paginatedDepartment: DepartMent[] = [];
  pageSize = 10;
  currentPage = 1;
  length = 0;
  loading = false;
  searchQuery = '';
  noResults = false; 

  limits: number[] = [5, 10, 25, 100]; 

  constructor(private _DepartService: DepartService , private _ConfirmService :ConfirmService , private _Router:Router) {}

  ngOnInit(): void {
    this.getProduct();
  }
  //* Method to fetch products from the ProductService
  getProduct() {
    this.loading = true;
    
    this._DepartService.getDepartments().subscribe({
      next: (res) => {
        this.department = res;
        this.sortProductsByNewest(); 
        this.length = this.department.length;
        this.updatePagination(); 
        this.loading = false;
        this.noResults = this.paginatedDepartment.length === 0; 
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.noResults = true; 
      },
    });
  }
  //& Method to search for products by name
  searchDepart(name: string): void {
    this.loading = true;
    this._DepartService.getSearchDepartment(name).subscribe({
      next: (response) => {
        this.department = response;
        this.sortProductsByNewest(); 
        this.updatePagination(); 
        this.noResults = this.paginatedDepartment.length === 0;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.noResults = true; // Show "No results" if an error occurs
      },
    });
  }

  //^ Method to sort products by their creation date in descending order
  sortProductsByNewest(): void {
    this.department.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedDepartment = this.department.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.numberOfPages()) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.numberOfPages()) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  onLimitChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = +selectElement.value;
    this.currentPage = 1; 
    this.updatePagination();
  }

  numberOfPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }




  onDelete(id: string) {
    this._ConfirmService.confirmDeletion().then((isConfirmed) => {
      if (isConfirmed) {
        this._DepartService.deleteItem(id).subscribe(
          (response) => {
            this.department = this.department.filter(item => item.id !== id);
            this.getProduct();
            Swal.fire({
              title: "تم الحف بنجاج",
              icon: "success"
            });
          },
          (error) => {
            Swal.fire({
              text: "حدث خطاء غير متوقع",
              icon: "error"
            });
          }
        );
      }
    });
  }


  onEdit(product: any): void {
    this._Router.navigate(['/dashbords/depart/edit', product.id]);
  }
}
