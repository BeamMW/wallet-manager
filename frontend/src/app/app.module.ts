import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatExpansionModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTabsModule,
  MatListModule,
  MatCardModule,
  MatProgressBarModule,
  MatTableModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSidenavModule,
} from '@angular/material';
import { WalletAddressesComponent } from './components/wallet-addresses/wallet-addresses.component';
import { WalletUtxoComponent } from './components/wallet-utxo/wallet-utxo.component';
import { WalletTransactionsComponent } from './components/wallet-transactions/wallet-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    WalletAddressesComponent,
    WalletUtxoComponent,
    WalletTransactionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Material
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
