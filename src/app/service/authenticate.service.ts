import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IAuthResponseDTO,
  IUserRequestDTO,
  IUserResponseDTO,
} from '../interfaces/authinterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  private http = inject(HttpClient);
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:8080';

  constructor() {}

  register(user: IUserRequestDTO): Observable<IUserResponseDTO> {
    return this.http.post<IUserResponseDTO>(
      `${this.apiUrl}/user/register`,
      user
    );
  }

  login(user: IUserRequestDTO): Observable<IAuthResponseDTO> {
    return this.http.post<IAuthResponseDTO>(`${this.apiUrl}/user/login`, user);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // 'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  /*
    private getHeaders(): HttpHeaders {
      const token = this.authService.getToken();
      return new HttpHeaders({
        'Authorization': Bearer ${token}
      });
    }*/
}
