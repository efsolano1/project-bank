import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestDTO, IResponseDTO } from '../interfaces/accountinterface';


@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private http = inject(HttpClient);
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:8080/api';

  constructor() {}

  createAccount(account: IRequestDTO): Observable<IResponseDTO> {
    return this.http.post<IResponseDTO>(`${this.apiUrl}/account`, account);
  }

  getAllAccounts(): Observable<IResponseDTO[]> {
    return this.http.get<IResponseDTO[]>(`${this.apiUrl}/accounts`);
  }

  getAccountByNumber(account: IRequestDTO): Observable<IResponseDTO> {
    return this.http.post<IResponseDTO>(
      `${this.apiUrl}/account/number`,
      account
    );
  }

  getAccountById(id: string): Observable<IResponseDTO> {
    return this.http.get<IResponseDTO>(`${this.apiUrl}/account/${id}`);
  }

  updateAccount(account: IRequestDTO): Observable<IResponseDTO> {
    return this.http.put<IResponseDTO>(`${this.apiUrl}/account`, account);
  }
  
}
