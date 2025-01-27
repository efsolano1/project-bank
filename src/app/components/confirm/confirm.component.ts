import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  imports: [CommonModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  @Input() message='';
  @Input() type ='success';
 @Output() closed = new EventEmitter<boolean>();


    onConfirm(){
        this.closed.emit(true);
  }

   onCancel(){
    this.closed.emit(false);
   }

}
