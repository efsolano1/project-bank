import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IRequestDTO, IResponseDTO } from '../../interfaces/accountinterface';
import { delay, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from '../../service/account.service';
import { AlertService } from '../../service/alert.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-modal',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './account-modal.component.html',
  styleUrl: './account-modal.component.scss',
})
export class AccountModalComponent implements OnInit, OnDestroy {
  // @Input() account: IResponseDTO | null = null;
  // @Output() close = new EventEmitter<void>();
  // customerId = '';
  // accountName = '';
  // accountNumber = '';
  // balance = '';
  // status = '';
  // idUser = '123456';
  // private destroy$ = new Subject<void>();

  // statusOptions = [
  //   { label: 'Activo', value: 'ACCOUNT_ACTIVE' },
  //   { label: 'Inactivo', value: 'ACCOUNT_INACTIVE' },
  // ];

  // constructor(
  //   private accountService: AccountService,
  //   private alertService: AlertService
  // ) {
  //   this.alertService.alert$
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((alert) => {
  //       if (alert) {
  //         this.close.emit();
  //       }
  //     });
  // }

  // ngOnInit(): void {
  //   if (this.account) {
  //     this.customerId = this.account.customerId || '';
  //     this.accountName = this.account.accountName || '';
  //     this.accountNumber = this.account.accountNumber || '';
  //     this.balance = String(this.account.balance || 0);
  //     this.status = this.account.status || '';
  //   } else {
  //     this.status = 'ACCOUNT_ACTIVE';
  //   }
  // }
  // saveAccount() {
  //   const account: IRequestDTO = {
  //     //customerId: this.customerId,
  //     accountNum: this.accountNumber,
  //     name: this.accountName,
  //     balance: Number(this.balance),
  //     //status: this.status,
  //     idUser: this.idUser,
  //   };
  //   if (this.account) {
  //     account.customerId = this.customerId;
  //     account.status = this.status;
  //   }
  //   let action: Observable<IResponseDTO>;
  //   if (this.account) {
  //     action = this.accountService.updateAccount(account);
  //   } else {
  //     action = this.accountService.createAccount(account);
  //   }
  //   action
  //     .pipe(
  //       takeUntil(this.destroy$),
  //       tap(() => {
  //         this.alertService.showAlert(
  //           this.account
  //             ? 'La cuenta ha sido actualizada correctamente.'
  //             : 'La cuenta se ha creado correctamente.',
  //           'success'
  //         );
  //       }),
  //       delay(2000)
  //     )
  //     .subscribe(() => {
  //       this.close.emit();
  //     });
  // }
  // onNoClick(): void {
  //   this.close.emit();
  // }
  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }
  @Input() account: IResponseDTO | null = null;
  @Output() close = new EventEmitter<void>();
   accountForm: FormGroup;
   idUser = '123456';
    private destroy$ = new Subject<void>();
    statusOptions = [
       { label: 'Activo', value: 'ACCOUNT_ACTIVE' },
        { label: 'Inactivo', value: 'ACCOUNT_INACTIVE' },
    ];

    constructor(private accountsService: AccountService,
                 private alertService: AlertService,
                private fb: FormBuilder) {
      this.accountForm = this.fb.group({
            customerId: [''],
          accountName: ['', Validators.required],
            accountNumber: ['', Validators.required],
             balance: ['', [Validators.required, Validators.min(0)]],
           status: ['', Validators.required],
       });

       this.alertService.alert$.pipe(takeUntil(this.destroy$)).subscribe(alert => {
         if (alert) {
            this.close.emit();
        }
       });
    }

   ngOnInit(): void {
       if (this.account) {
           this.accountForm.patchValue({
             customerId: this.account.customerId || '',
                accountName: this.account.accountName || '',
                 accountNumber: this.account.accountNumber || '',
                balance: this.account.balance || 0,
                 status: this.account.status || '',
           });
       }else{
           this.accountForm.patchValue({
              status: 'ACCOUNT_ACTIVE'
         });
     }
   }
   saveAccount() {
     if (this.accountForm.valid) {
          const account: IRequestDTO = {
                customerId: this.accountForm.value.customerId,
                 name: this.accountForm.value.accountName,
                 accountNum: this.accountForm.value.accountNumber,
               balance: Number(this.accountForm.value.balance),
                status: this.accountForm.value.status,
               idUser:this.idUser
        };
        let action: Observable<IResponseDTO>;
        if (this.account) {
            action = this.accountsService.updateAccount(account);
        } else {
           action = this.accountsService.createAccount(account);
         }
      action.pipe(takeUntil(this.destroy$)).subscribe(() => {
             this.close.emit();
          this.alertService.showAlert(
              this.account ? 'La cuenta ha sido actualizada correctamente.' : 'La cuenta se ha creado correctamente.',
              'success'
            );
       });
      }
   }
   onNoClick(): void {
     this.close.emit();
  }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }
}
