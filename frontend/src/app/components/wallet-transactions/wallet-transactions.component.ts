import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.css']
})
export class WalletTransactionsComponent implements OnInit {

  displayedColumns: string[] = ['date', 'address', 'amount', 'status'];

  status_loading: boolean;
  transactions_loading: boolean;

  wallet_transactions: any;
  wallet_status: any;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.status_loading = true;
    this.transactions_loading = true;

    this.dataService.loadWalletStatus().subscribe((status) => {
      this.wallet_status = status;
      this.status_loading = false;
    });

    this.dataService.loadTxList().subscribe((list) => {
      this.wallet_transactions = list;
      this.transactions_loading = false;
    });
  }
}
