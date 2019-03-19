import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import {Wallet, Transaction, Utxo} from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_BASE = 'http://127.0.0.1:8000/manager';
  HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
  };

  constructor(private http: HttpClient) {
  }

  loadWalletsList() {
    return this.http.get<Wallet[]>(this.API_BASE + '/wallets/', this.HTTP_OPTIONS);
  }

  addWallet(wallet) {
    return this.http.post(this.API_BASE + '/wallets/', JSON.stringify(wallet), this.HTTP_OPTIONS);
  }

  deleteWallet(port) {
    return this.http.delete(this.API_BASE + '/wallets/' + port + '/', this.HTTP_OPTIONS);
  }

  loadWalletStatus(port) {
    return this.http.get<Wallet>(this.API_BASE + '/wallet_status/?port=' + port);
  }

  loadTxList(port) {
    return this.http.get<Transaction[]>(this.API_BASE + '/tx_list/?port=' + port);
  }

  loadUtxo(port) {
    return this.http.get<Utxo[]>(this.API_BASE + '/get_utxo/?port=' + port);
  }
}
