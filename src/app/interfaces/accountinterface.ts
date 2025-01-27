// accounts.interfaces.ts

export interface IRequestDTO {
  customerId?: string;
  name?: string;
  accountNum?: string;
  balance?: number;
  status?: string;
  idUser?: string;
}

export interface IResponseDTO {
  customerId?: string;
  accountId?: string;
  accountName?: string;
  accountNumber?: string;
  balance?: number;
  status?: string;
}
