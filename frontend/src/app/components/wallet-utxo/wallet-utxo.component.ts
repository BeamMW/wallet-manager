import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-wallet-utxo',
  templateUrl: './wallet-utxo.component.html',
  styleUrls: ['./wallet-utxo.component.css']
})

export class WalletUtxoComponent implements OnInit {
  displayedColumns: string[] = ['amount', 'maturity', 'status', 'type'];

  utxo_loading: boolean;
  status_loading: boolean;

  utxo_list: any;
  wallet_status: any;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.status_loading = true;

    this.dataService.loadWalletStatus().subscribe((status) => {
      this.wallet_status = status;
      this.status_loading = false;
    });

    this.dataService.loadUtxo().subscribe((list) => {
      this.utxo_list = list;
      this.utxo_loading = false;
    });
  }
}
