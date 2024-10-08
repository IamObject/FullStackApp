import { AppConfig } from './../../config/app.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../login/model.user';
@Injectable()
export class AccountService {
  constructor(public http: HttpClient) { }

  

  createAccount(user: User) { 
    return this.http.post(AppConfig.API_URL + '/authentication/registerUser', user, { observe: 'response' });
  }


}
