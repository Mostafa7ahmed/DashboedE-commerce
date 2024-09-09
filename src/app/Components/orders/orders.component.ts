import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderDataService } from 'src/app/Core/Service/order-data.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],

  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  createdAt :string =""
  currentPage = 1;
  numberOfPages = 0;
  limit = 10;
  limits = [5, 15, 20, 30, 40];
  loading = false;

  constructor(private _OrderDataService: OrderDataService) {}

  ngOnInit(): void {
    this.getOrders(this.currentPage, this.limit);
  }

  getOrders(page: number, limit: number): void {
    this.loading = true;
    this._OrderDataService.getOrders(page, limit).subscribe(response => {
      this.orders = response.data;
        this.createdAt = response.data.updatedAt
      console.log(this.createdAt)
      this.numberOfPages = response.results; 
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error('Error fetching orders:', error);
    });
  }

  goToNextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.executeCurrentOperation();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.executeCurrentOperation();
    }
  }

  onLimitChange(event: any): void {
    this.limit = +event.target.value;
    this.currentPage = 1;
    this.executeCurrentOperation();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.numberOfPages) {
      this.currentPage = page;
      this.executeCurrentOperation();
    }
  }

  private executeCurrentOperation(): void {
    this.getOrders(this.currentPage, this.limit);
  }
}
