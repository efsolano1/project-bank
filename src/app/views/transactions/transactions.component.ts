import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { TableComponent } from '../../components/table/table.component';
import { ITransactionResponseDTO } from '../../interfaces/transactioninterface';
import { delay, forkJoin, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { TransactionService } from '../../service/transaction.service';
import { AccountService } from '../../service/account.service';
import { IResponseDTO } from '../../interfaces/accountinterface';
import { AlertService } from '../../service/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionModalComponent } from "../../components/transaction-modal/transaction-modal.component";
import { LoaderComponent } from "../../components/loader/loader.component";
import { AlertComponent } from "../../components/alert/alert.component";

@Component({
  selector: 'app-transactions',
  imports: [CardComponent, TableComponent, CommonModule, FormsModule, TransactionModalComponent, LoaderComponent, AlertComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  svgIcon =
    'M224 0C100.3 0 0 100.3 0 224s100.3 224 224 224 224-100.3 224-224S347.7 0 224 0zm0 400c-42.2 0-78-30.5-78-68s35.8-68 78-68 78 30.5 78 68-35.8 68-78 68zm50-160c-3.7 0-7.2-1.3-10.3-3.6l-56-43c-3.1-2.4-3.1-7.1 0-9.5l56-43c3.1-2.4 6.6-3.6 10.3-3.6 5.8 0 10.5 4.7 10.5 10.5v138c0 5.8-4.7 10.5-10.5 10.5zm-100 0c-3.7 0-7.2-1.3-10.3-3.6l-56-43c-3.1-2.4-3.1-7.1 0-9.5l56-43c3.1-2.4 6.6-3.6 10.3-3.6 5.8 0 10.5 4.7 10.5 10.5v138c0 5.8-4.7 10.5-10.5 10.5z';
  image = '../../../assets/images/coins.jpg';

  //Datos Tabla
  tableHeaders: any[] = [
    { property: 'date', label: 'Fecha' },
    { property: 'type', label: 'Tipo' },
    { property: 'amount', label: 'Monto' },
    { property: 'cost', label: 'Costo Transaccion' },
    {property:'idAccount',label:'Cuenta'},
  ];

  tableData: ITransactionResponseDTO[] = [];
  accounts: IResponseDTO[] = [];
  respuesta: any;

  accountName="";
  accountBalance="---------";
  selectedAccountId='';
  showModal = false;
  loader = false;

  showAlert = false;
  alertMessage = '';
  alertType = '';

  private destroy$ = new Subject<void>();

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
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
    //this.getAllTransactions();
    //this.getAllAccounts();
    //
    this.loadData();
  }

  getAllTransactions() {
    this.transactionService
      .getAllTransactions()
      .pipe(takeUntil(this.destroy$), tap(console.log))
      .subscribe((response) => {
        this.tableData = response;
      });
  }

  getAllAccounts() {
    this.accountService
      .getAllAccounts()
      .pipe(takeUntil(this.destroy$), tap(console.log))
      .subscribe((response) => {
        this.accounts = response;
      });
  }

  loadData() {
    of(1)
       .pipe(
          tap(() => this.loader = true),
          delay(2000),
        switchMap(()=>forkJoin({
         transactions: this.transactionService.getAllTransactions(),
        accounts:  this.accountService.getAllAccounts()
       })),
      tap(() => this.loader = false)
     ).pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.tableData = response.transactions;
          this.accounts = response.accounts;
      })
   }

  createTransaction() {
    this.showModal = true;
  }

  closeModal(account:IResponseDTO){
    this.showModal = false;
          this.getAllTransactions();
          //this.getAllAccounts();
          //console.log("Cuenta "+account);
          if(account && account.accountId){
              this.accountService.getAccountById(account.accountId).pipe(takeUntil(this.destroy$))
               .subscribe(response=>{
                  this.accountName = response.accountName || "";
                this.accountBalance = String(response.balance || "");
            })
        }
    }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeAlert(){
    this.showAlert = false;
    this.alertService.closeAlert();
}
}
