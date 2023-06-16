import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  successAlert(message: string) {
    Swal.fire(
      'Proceso terminado!',
      message,
      'success'
    )
  }

  errorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      footer: 'Syscal'
    })
  }


}
