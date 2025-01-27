import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITransactionRequestDTO, ITransactionResponseDTO } from '../interfaces/transactioninterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:8080';

  constructor() { }

  saveTransaction(transaction: ITransactionRequestDTO, customerId: string): Observable<ITransactionResponseDTO> {
    return this.http.post<ITransactionResponseDTO>(`${this.apiUrl}/api/transaction`, transaction, {params: {customerId} });
  }

  getAllTransactions(): Observable<ITransactionResponseDTO[]> {
    return this.http.get<ITransactionResponseDTO[]>(`${this.apiUrl}/api/transactions`);
  }
}
