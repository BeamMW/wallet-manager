import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

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
  MatDialogModule,
} from '@angular/material';
import { WalletAddressesComponent } from './components/wallet-addresses/wallet-addresses.component';
import { WalletUtxoComponent } from './components/wallet-utxo/wallet-utxo.component';
import { WalletTransactionsComponent } from './components/wallet-transactions/wallet-transactions.component';
import { WalletManagerComponent, WalletManagerDialogComponent } from './components/wallet-manager/wallet-manager.component';
import { ReceiveComponent } from './components/receive/receive.component';
import { SendComponent } from './components/send/send.component';

@NgModule({
  entryComponents: [
    WalletManagerComponent,
    WalletManagerDialogComponent
  ],
  declarations: [
    AppComponent,
    WalletComponent,
    WalletAddressesComponent,
    WalletUtxoComponent,
    WalletTransactionsComponent,
    WalletManagerComponent,
    WalletManagerDialogComponent,
    ReceiveComponent,
    SendComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
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
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
