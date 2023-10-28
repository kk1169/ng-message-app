export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface IRegisterResponse {
  message: string;
  user: IUser;
}

export interface ILoginResponse {
  message: string;
  data: IUser;
  token: string;
}

export interface ICommonResponse<T> {
  message?: string;
  status?: string
  data?: T;
}

