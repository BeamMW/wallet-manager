import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

const GROTHS_IN_BEAM = 100000000;

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WalletTransactionsComponent implements OnInit {
  displayedColumns: string[] = ['icon', 'date', 'address', 'amount', 'status', 'actions'];
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
  columns = [
    'name',
    'value'
  ];

  wallet_transactions: any = [];
  wallet_status: any;

  expandedItem: any;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  toggleElement(value) {
    const foundElement = this.wallet_transactions.find(elem => elem.item !== undefined && elem.item.txId === value.txId);
    const index = this.wallet_transactions.indexOf(foundElement);
    this.wallet_transactions[index].item.show = !this.wallet_transactions[index].item.show;
  }

  receiveClicked() {
    this.router.navigate(['wallet/' + this.port + '/receive']);
  }

  sendClicked() {
    this.router.navigate(['wallet/' + this.port + '/send']);
  }

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
      list.forEach((item) => {
        item.statusName = this.statuses.find(status => status.id === item.status).name;
        item.value /= GROTHS_IN_BEAM;
        item.show = false;

        item.tableData = [
          {name: 'Sending address:', value: item.sender},
          {name: 'Receiving address:', value: item.receiver},
          {name: 'Transaction fee:', value: item.fee},
          {name: 'Comment:', value: item.comment},
          {name: 'Kernel ID:', value: item.kernel},
          {name: 'Error:', value: ' '}
          ];
        this.wallet_transactions.push(item, { detailRow: true, item });
      });

      this.transactions_loading = false;
    });
  }
}
