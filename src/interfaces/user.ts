import { IAddress } from './address';
import { BaseObj } from '../types/baseObj';

interface UserBase {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface IUserBase extends UserBase, BaseObj {}

export interface IUser extends UserBase {
  address: IAddress;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}


export const userBaseKeys: (keyof IUserBase)[] = ['id', 'name', 'username', 'email', 'phone', 'website'];