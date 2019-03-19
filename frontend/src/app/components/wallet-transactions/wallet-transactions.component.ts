import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';

const GROTHS_IN_BEAM = 100000000;

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

    this.dataService.loadWalletStatus(this.port).subscribe((status) => {
      this.wallet_status = status;
      this.wallet_status.available /= GROTHS_IN_BEAM;
      this.wallet_status.receiving /= GROTHS_IN_BEAM;
      this.wallet_status.sending /= GROTHS_IN_BEAM;
      this.wallet_status.maturing /= GROTHS_IN_BEAM;
      this.status_loading = false;
    });

    this.dataService.loadTxList(this.port).subscribe((list) => {
      this.wallet_transactions = list.map((item) => {
        item.statusName = this.statuses.find(status => status.id === item.status).name;
        item.value /= GROTHS_IN_BEAM;
        return item;
      });
      this.transactions_loading = false;
    });
  }
}
