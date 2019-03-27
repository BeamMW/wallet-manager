import {Component, HostListener, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';

const GROTHS_IN_BEAM = 100000000;
@Component({
  selector: 'app-wallet-addresses',
  templateUrl: './wallet-addresses.component.html',
  styleUrls: ['./wallet-addresses.component.css']
})
export class WalletAddressesComponent implements OnInit {
  addressesColumns: string[] = ['comment', 'address', 'category', 'exp_date', 'created', 'actions'];
  contactsColumns: string[] = ['comment', 'contact', 'category', 'actions'];
  addressOptions = [
      {num: 1, name: 'edit address'},
      {num: 2, name: 'delete address'}
  ];
  selectedElem: any;

  addresses_loading: boolean;
  status_loading: boolean;

  port: string;
  active_addresses_list: any;
  expired_addresses_list: any;
  contacts_list: any;
  wallet_status: any;
  @HostListener('document:click', ['$event']) clickout(event) {
    if (this.selectedElem !== undefined) {
      this.selectedElem.style['visibility'] = 'hidden';
    }
  }

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) { }

  showOptions(event) {
    event.stopPropagation();
    if (this.selectedElem !== undefined) {
      this.selectedElem.style['visibility'] = 'hidden';
    }
    this.selectedElem = event.srcElement.nextElementSibling;
    this.selectedElem.style['visibility'] = 'visible';
  }

  itemOptionChange(event, option, item) {
    event.stopPropagation();
    if (this.addressOptions[0].num === option.num) {
      // edit
    } else if (this.addressOptions[1].num === option.num) {
      this.dataService.deleteAddress(this.port, item.address).subscribe((result) => {
        this.loadAdresses();
      });
    }
    this.selectedElem.style['visibility'] = 'hidden';
  }

  loadAdresses() {
    this.dataService.loadAddressesList(this.port).subscribe((list) => {
      const addresses_list = list.map((item) => {
        item.amount /= GROTHS_IN_BEAM;
        return item;
      });

      this.active_addresses_list = addresses_list.filter(address => !address.expired);
      this.expired_addresses_list = addresses_list.filter(address => address.expired);
      this.addresses_loading = false;
    });
  }

  ngOnInit() {
    this.status_loading = true;
    this.port = this.route.snapshot.parent.params.port;

    this.dataService.loadWalletStatus(this.port).subscribe((status) => {
      this.wallet_status = status;
      this.status_loading = false;
    });

    this.dataService.loadContactsList(this.port).subscribe((list) => {
      this.contacts_list = list;
    });

    this.loadAdresses();
  }
}
