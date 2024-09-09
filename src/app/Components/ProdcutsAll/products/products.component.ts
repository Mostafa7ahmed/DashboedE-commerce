import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Core/Service/product.service';
import { ConfirmService } from 'src/app/Core/Service/confirm.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  paginatedProducts: any[] = [];
  pageSize = 10;
  currentPage = 1;
  length = 0;
  loading = false;
  searchQuery = '';
  noResults = false; 

  limits: number[] = [5, 10, 25, 100]; 

  constructor(private _productService: ProductService , private _ConfirmService :ConfirmService , private _Router:Router) {}

  ngOnInit(): void {
    this.getProduct();
  }
  //* Method to fetch products from the ProductService
  getProduct() {
    this.loading = true;
    
    this._productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.sortProductsByNewest(); 
        this.length = this.products.length;
        this.updatePagination(); 
        this.loading = false;
        this.noResults = this.paginatedProducts.length === 0; // Set noResults if no products are found
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.noResults = true; // Show "No results" if an error occurs
      },
    });
  }
  //& Method to search for products by name
  searchUsers(name: string): void {
    this.loading = true;
    this._productService.getSearchProducts(name).subscribe({
      next: (response) => {
        this.products = response;
        this.sortProductsByNewest(); 
        this.updatePagination(); 
        this.noResults = this.paginatedProducts.length === 0;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching products:', error);
        this.loading = false;
        this.noResults = true; // Show "No results" if an error occurs
      },
    });
  }

  //^ Method to sort products by their creation date in descending order
  sortProductsByNewest(): void {
    this.products.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
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




  onDelete(id: number) {
    this._ConfirmService.confirmDeletion().then((isConfirmed) => {
      if (isConfirmed) {
        this._productService.deleteItem(id).subscribe(
          (response) => {
            this.products = this.products.filter(item => item.id !== id);
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
    this._Router.navigate(['/dashbords/products/edit', product.id]);
  }

}
