import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor() { }


  confirmDeletion(): Promise<boolean> {
    return Swal.fire({
      title: "هل انت متاكد من حذف هذا ؟",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
     confirmButtonText: "حذف",
      cancelButtonText: "الغاء"
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  
}
