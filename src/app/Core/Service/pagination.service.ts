import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  currentPage: number = 1;
  numberOfPages: number = 1;
  limit: number = 10;
  searchQuery: string = '';
  limits: number[] = [5,15,20,30,40,50];

  goToNextPage(callback: () => void): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.executeCurrentOperation(callback);
    }
  }

  goToPreviousPage(callback: () => void): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.executeCurrentOperation(callback);
    }
  }

  onLimitChange(event: any, callback: () => void): void {
    this.limit = +event.target.value;
    this.executeCurrentOperation(callback);
  }

  goToPage(page: number, callback: () => void): void {
    if (page >= 1 && page <= this.numberOfPages) {
      this.currentPage = page;
      this.executeCurrentOperation(callback);
    }
  }

  onSearch(callback: (query: string) => void, fetchCallback: () => void): void {
    if (this.searchQuery.trim()) {
      callback(this.searchQuery);
    } else {
      fetchCallback();
    }
  }

  private executeCurrentOperation(callback: () => void): void {
    callback();
  }
}
