import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'src/app/Core/InterFace/message';
import { ConfirmService } from 'src/app/Core/Service/confirm.service';
import { MessageService } from 'src/app/Core/Service/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message',
  standalone: true,

  imports: [CommonModule, FormsModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {


  
  message: Message[] = [];
  paginatedMessage: Message[] = [];
  pageSize = 10;
  currentPage = 1;
  length = 0;
  loading = false;
  searchQuery = '';
  noResults = false; 

  limits: number[] = [5, 10, 25, 100]; 

  constructor(private _MessageService: MessageService , private _ConfirmService :ConfirmService , private _Router:Router) {}

  ngOnInit(): void {
    this.getMessage();
  }
  //* Method to fetch products from the ProductService
  getMessage() {
    this.loading = true;
    
    this._MessageService.GetMessage().subscribe({
      next: (res) => {
        this.message = res;
        this.sortProductsByNewest(); 
        this.length = this.message.length;
        this.updatePagination(); 
        this.loading = false;
        this.noResults = this.paginatedMessage.length === 0; 
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.noResults = true; 
      },
    });
  }
  //& Method to search for products by name
  searchMessage(name: string): void {
    this.loading = true;
    this._MessageService.getSearchMessage(name).subscribe({
      next: (response) => {
        this.message = response;
        this.sortProductsByNewest(); 
        this.updatePagination(); 
        this.noResults = this.paginatedMessage.length === 0;
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
    this.message.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMessage = this.message.slice(startIndex, endIndex);
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
        this._MessageService.deleteItem(id).subscribe(
          (response) => {
            this.message = this.message.filter(item => item.id !== id);
            this.getMessage();
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


  


 

  

}
