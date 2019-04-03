import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';

const GROTHS_IN_BEAM = 100000000;

@Component({
  selector: 'app-send-swap',
  templateUrl: './send-swap.component.html',
  styleUrls: ['./send-swap.component.css']
})
export class SendSwapComponent implements OnInit {
  @ViewChild('sendToInput') public sendToInput: ElementRef;
  @ViewChild('commentInput') public commentInput: ElementRef;
  @ViewChild('amountInput') public amountInput: ElementRef;
  @ViewChild('amountBtcInput') public amountBtcInput: ElementRef;
  @ViewChild('feeInput') public feeInput: ElementRef;

  port: string;
   minWidth = 64;
    width: number = this.minWidth;
  constructor(private _location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) { }

  cancelClicked() {
    this._location.back();
  }

  sendClicked() {
    this.dataService.tx_swap(this.sendToInput.nativeElement.value, this.amountInput.nativeElement.value,
        this.amountBtcInput.nativeElement.value).subscribe((result) => {
          this._location.back();
    });
  }

  ngOnInit() {
    this.port = this.route.snapshot.parent.params.port;
    this.feeInput.nativeElement.value = 10;
    this.amountInput.nativeElement.value = 1;
    this.amountBtcInput.nativeElement.value = 10;
    this.sendToInput.nativeElement.value = '2790301e6c320382679e67712d7b31d743b3dcbef8ce7abfb7537135d11d4d4bb4f';
  }
}
