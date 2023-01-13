import { IAddress } from './address';

export interface IUserBase {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  
}

export interface IUser extends IUserBase {
  address: IAddress;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const userBaseKeys: (keyof IUserBase)[] = ['id', 'name', 'username', 'email', 'phone', 'website'];