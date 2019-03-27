import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  @ViewChild('sendToInput') public sendToInput: ElementRef;
  @ViewChild('commentInput') public commentInput: ElementRef;
  @ViewChild('amountInput') public amountInput: ElementRef;
  @ViewChild('feeInput') public feeInput: ElementRef;

  port: string;
  constructor(private _location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) { }

  cancelClicked() {
    this._location.back();
  }

  sendClicked() {
    this.dataService.txSend(this.port, this.amountInput.nativeElement.value,
      this.feeInput.nativeElement.value, '', this.sendToInput.nativeElement.value,
      this.commentInput.nativeElement.value).subscribe((address) => {
          this._location.back();
    });
  }

  ngOnInit() {
    this.port = this.route.snapshot.parent.params.port;
    this.feeInput.nativeElement.value = 10;
  }

}
