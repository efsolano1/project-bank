// auth.interfaces.ts
export interface IUserRequestDTO {
    email: string;
    password: string;
  }
  
  export interface IUserResponseDTO {
    email: string;
  }
  
  export interface IAuthResponseDTO {
    token: string;
  }