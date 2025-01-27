import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRequestDTO, IResponseDTO } from '../../interfaces/accountinterface';
import { AccountService } from '../../service/account.service';
import { TableComponent } from '../../components/table/table.component';
import { AlertService } from '../../service/alert.service';
import { delay, Subject, takeUntil } from 'rxjs';
import { AccountModalComponent } from '../../components/account-modal/account-modal.component';
import { AlertComponent } from "../../components/alert/alert.component";

@Component({
  selector: 'app-accounts',
  imports: [TableComponent, AccountModalComponent, AlertComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit, OnDestroy {
  tableHeaders: any[] = [
    // { property:'customerId',label:'Customer ID'},
    // { property:'accountId',label:'Account ID'},
    { property: 'accountName', label: 'Account Name' },
    { property: 'accountNumber', label: 'Account Number' },
    { property: 'balance', label: 'Balance' },
    { property: 'status', label: 'Status' },
  ];

  tableData: IResponseDTO[] = [];
  showModal = false;
  opciones = true;	

  showAlert = false;
  alertMessage = '';
  alertType = '';

  selectedAccount: IResponseDTO | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private accountsService: AccountService,
    private alertService: AlertService
  ) {
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

  ngOnInit(): void {
    this.getAllAccounts();
  }
  createAccount() {
    this.selectedAccount = null;
    this.showModal = true;
  }
  getAllAccounts() {
    this.accountsService
      .getAllAccounts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.tableData = response;
      });
  }
  updateAccount(account: IResponseDTO) {
    this.selectedAccount = account;
    this.showModal = true;
  }

  searchAccount(account: IResponseDTO) {
    const search: IRequestDTO = {
      accountNum: account.accountNumber,
      customerId: account.customerId,
    };
    this.accountsService.getAccountByNumber(search).subscribe((response) => {
      this.tableData = [response];
    });
  }
  deleteAccount(account: IResponseDTO) {}

  closeModal() {
    this.showModal = false;
    this.getAllAccounts();
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
