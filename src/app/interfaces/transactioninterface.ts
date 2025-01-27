// transactions.interfaces.ts

export interface ITransactionRequestDTO {
  operationId?: string;
  amount?: number;
  type?: string;
  cost?: number;
  idAccount?: string;
  status?: string;
}

export interface ITransactionResponseDTO {
  operationId?: string;
  transactionId?: string;
  amount?: number;
  type?: string;
  cost?: number;
  idAccount?: string;
  status?: string;
  date?: Date;
}
