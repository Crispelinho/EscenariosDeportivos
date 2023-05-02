import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  constructor(
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) { }

  //Esto no se puede tocar
  openSnackBar(message: string, action: string, duration: number = 12000) {
    this.snackBar.open(message.toUpperCase(), action,{
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showSuccess(message:string) {
    this.toastr.success(message)
  }
}