import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataUsersService } from 'src/app/Core/Service/data-users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DataUsersService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: any[] = [];
  orders: number = 0;
  Product: number = 0;
  random:number= Math.floor(Math.random()*100000);

  totalUsers = 0;
  currentPage = 1;
  numberOfPages = 0;
  limit = 10;
  searchQuery = '';
  limits = [5, 15, 20, 30, 40];
  loading = false;

  constructor(private _DataUsersService: DataUsersService) {}

  ngOnInit(): void {
    this.getUsers(this.currentPage, this.limit);
    this.getOrder();
    this.getProducts();
  }

  getUsers(page: number, limit: number): void {
    this.loading = true;
    this._DataUsersService.getUsers(page, limit).subscribe(response => {
      this.updateUserData(response);
    }, error => {
      this.loading = false;
      console.error('Error fetching users:', error);
    });
  }

  getOrder() {
    this._DataUsersService.getOrders().subscribe(users => { 
      this.orders = users.results;
    })
  }
  getProducts() {
    this._DataUsersService.getProducts().subscribe(Products => { 
      console.log(Products);
      this.Product = Products.length;
    })
  }
 
  searchUsers(name: string): void {
    this.loading = true;
    this._DataUsersService.searchUsers(name, this.currentPage, this.limit).subscribe(response => {
      this.updateUserData(response);
    }, error => {
      this.loading = false;
      console.error('Error searching users:', error);
    });
  }

  private updateUserData(response: any): void {
    this.users = response.users;
    this.totalUsers = response.totalUsers;
    this.currentPage = response.metadata.currentPage;
    this.numberOfPages = response.metadata.numberOfPages;
    this.loading = false;
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

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.searchUsers(this.searchQuery);
    } else {
      this.getUsers(this.currentPage, this.limit);
    }
  }

  onKeyUp(): void {
    this.onSearch();
  }

  private executeCurrentOperation(): void {
    if (this.searchQuery.trim()) {
      this.searchUsers(this.searchQuery);
    } else {
      this.getUsers(this.currentPage, this.limit);
    }
  }
}
