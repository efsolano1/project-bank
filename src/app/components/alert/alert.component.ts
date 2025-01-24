import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit{
  @Input() message = '';
  @Input() type = 'success';
  @Output() close = new EventEmitter<void>();

  timeoutId: any;

    ngOnInit(): void {
        this.timeoutId = setTimeout(()=>{
          this.closeAlert();
       },6000)
    }

  closeAlert() {
    clearTimeout(this.timeoutId);
    this.close.emit();
  }
}
