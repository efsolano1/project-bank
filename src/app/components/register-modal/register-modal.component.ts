import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { AuthenticateService } from '../../service/authenticate.service';
import { IUserRequestDTO } from '../../interfaces/authinterface';
import { AlertService } from '../../service/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register-modal',
  imports: [CommonModule,FormsModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss',
})
export class RegisterModalComponent implements OnDestroy{
  @Output() close = new EventEmitter<void>()
username = '';
password = '';
private destroy$ = new Subject<void>();
constructor(
  private authService: AuthenticateService,
  private alertService:AlertService
) {
       this.alertService.alert$.pipe(takeUntil(this.destroy$)).subscribe(alert=>{
            if(alert){
                this.close.emit();
            }
       })
  }


registerUser(){
   const user : IUserRequestDTO={
       email: this.username,
       password:this.password
    };
   this.authService.register(user).subscribe(response=>{
 
 this.alertService.showAlert('El usuario se ha registrado correctamente.','success')

   })
}

onNoClick(): void {
  this.close.emit()
}
 ngOnDestroy(): void {
      this.destroy$.next();
     this.destroy$.complete();
 }
}
