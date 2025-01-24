import { Component, OnDestroy } from '@angular/core';
import { RegisterModalComponent } from "../../components/register-modal/register-modal.component";
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from '../../service/alert.service';
import { AlertComponent } from "../../components/alert/alert.component";

@Component({
  selector: 'app-users',
  imports: [RegisterModalComponent, AlertComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnDestroy{
  showModal = false;
    showAlert=false;
 alertMessage = '';
 alertType = '';
 private destroy$ = new Subject<void>();

    constructor(private alertService: AlertService) {
       this.alertService.alert$.pipe(takeUntil(this.destroy$)).subscribe(alert => {
           if(alert){
               this.showAlert=true;
             this.alertMessage= alert.message;
            this.alertType= alert.type;
           }else{
              this.showAlert=false;
           }
        })
    }
  openRegisterModal() {
     this.showModal = true;
   }

   closeModal(){
      this.showModal = false;
  }
   closeAlert(){
        this.showAlert = false;
        this.alertService.closeAlert();
    }
    ngOnDestroy(): void {
         this.destroy$.next();
         this.destroy$.complete();
     }
}
