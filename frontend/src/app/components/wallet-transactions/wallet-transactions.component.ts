import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.css']
})

export class WalletTransactionsComponent implements OnInit {

  displayedColumns: string[] = ['date', 'address', 'amount', 'status'];
  port: string;
  statuses = [
    {id: 0, name: 'Pending'},
    {id: 1, name: 'InProgress'},
    {id: 2, name: 'Cancelled'},
    {id: 3, name: 'Completed'},
    {id: 4, name: 'Failed'},
    {id: 5, name: 'Registering'}];
  status_loading: boolean;
  transactions_loading: boolean;

  wallet_transactions: any;
  wallet_status: any;
  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.status_loading = true;
    this.transactions_loading = true;

    this.port = this.route.snapshot.parent.params.port;
    /*this.route.params.subscribe( (params) => {
      let sd =123;
   });*/

    this.dataService.loadWalletStatus(this.port).subscribe((status) => {
      this.wallet_status = status;
      this.wallet_status.available /= 100000000;
      this.wallet_status.receiving /= 100000000;
      this.wallet_status.sending /= 100000000;
      this.wallet_status.maturing /= 100000000;
      this.status_loading = false;
    });

    this.dataService.loadTxList(this.port).subscribe((list) => {
      this.wallet_transactions = list.map((item) => {
        item.statusName = this.statuses.find(status => status.id === item.status).name;
        item.value /= 100000000;
        return item;
      });
      this.transactions_loading = false;
    });
  }
}
