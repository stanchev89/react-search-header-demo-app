import { BaseObj } from '../types/baseObj';

export interface IAddress extends BaseObj {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  }
}