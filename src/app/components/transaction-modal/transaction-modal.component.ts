import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IResponseDTO } from '../../interfaces/accountinterface';
import { Subject, takeUntil, tap } from 'rxjs';
import { TransactionService } from '../../service/transaction.service';
import { AlertService } from '../../service/alert.service';
import { AccountService } from '../../service/account.service';
import { ITransactionRequestDTO } from '../../interfaces/transactioninterface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.scss',
})
export class TransactionModalComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<IResponseDTO>();
  @Input() accounts: IResponseDTO[] = [];
  amount = '';
  type = '';
  idAccount = '';
  cost = 0;
  status = 'PENDING';
  customerId = '';
  private destroy$ = new Subject<void>();
  typeOptions = [
    { label: 'DEPOSITO SUCURSAL', value: 'DEPOSITO_SUCURSAL' },
    { label: 'DEPOSITO CAJERO AUTOMATICO', value: 'DEPOSITO_CAJERO' },
    { label: 'DEPOSITO OTRA CUENTA', value: 'DEPOSITO_OTRA_CUENTA' },
    {
      label: 'COMPRA CON TARJETA ESTABLECIMIENTO FÍSICO',
      value: 'COMPRA_ESTABLECIMIENTO',
    },
    { label: 'COMPRA CON TARJETA PAGINA WEB', value: 'COMPRA_WEB' },
    { label: 'RETIRO CAJERO AUTOMATICO', value: 'RETIRO_CAJERO' },
  ];

  constructor(
    private transactionService: TransactionService,
    private alertService: AlertService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {}
  calculateCost() {
    if (this.type) {
      switch (this.type) {
        case 'DEPOSITO_CAJERO':
          this.cost = 2;
          break;
        case 'DEPOSITO_OTRA_CUENTA':
          this.cost = 1.5;
          break;
        case 'COMPRA_WEB':
          this.cost = 5;
          break;
        case 'RETIRO_CAJERO':
          this.cost = 1;
          break;
        default:
          this.cost = 0;
      }
    } else {
      this.cost = 0;
    }
  }

  saveTransaction() {
    this.calculateCost();
    const selectedAccount = this.accounts.find(
      (account) => account.accountNumber === this.idAccount
    );
    const transaction: ITransactionRequestDTO = {
      amount: Number(this.amount),
      type: this.type,
      cost: this.cost,
      idAccount: this.idAccount,
      status: this.status,
    };
    this.transactionService
      .saveTransaction(transaction, selectedAccount?.customerId || '')
      .pipe(
        takeUntil(this.destroy$),
        tap((response) => {
          if (selectedAccount && selectedAccount.accountId) {
            this.accountService
              .getAccountById(selectedAccount.accountId)
              .pipe(takeUntil(this.destroy$))
              .subscribe((account) => {
                this.close.emit(account);
                this.alertService.showAlert(
                  'La Transacción se ha creado correctamente.',
                  'success'
                );
              });
          } else {
            this.close.emit();
            this.alertService.showAlert(
              'La Transacción se ha creado correctamente.',
              'success'
            );
          }
        })
      )
      .subscribe();
  }
  onNoClick(): void {
    this.close.emit();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
