import { Component, OnInit } from '@angular/core';

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  walletRoutes: ROUTE[] = [
    {
      icon: 'wallet_icon',
      route: '',
      title: 'Wallet',
    }, {
      icon: 'addresses_icon',
      route: 'addresses',
      title: 'Addresses',
    }, {
      icon: 'utxo_icon',
      route: 'utxo',
      title: 'UTXO',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
