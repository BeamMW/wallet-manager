import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {WalletUtxoComponent} from './components/wallet-utxo/wallet-utxo.component';
import {WalletAddressesComponent} from './components/wallet-addresses/wallet-addresses.component';
import {WalletTransactionsComponent} from './components/wallet-transactions/wallet-transactions.component';

const routes: Routes = [
  { path: '', component: WalletTransactionsComponent, pathMatch: 'full' },
  { path: 'addresses', component: WalletAddressesComponent, pathMatch: 'full' },
  { path: 'utxo', component: WalletUtxoComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
