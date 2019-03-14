import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import {Wallet, Transaction, Utxo} from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_BASE = 'http://127.0.0.1:8000/manager';

  constructor(private http: HttpClient) {
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
