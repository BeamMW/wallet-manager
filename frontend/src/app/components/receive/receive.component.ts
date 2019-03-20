import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {
  @ViewChild('searchInput') public searchInput: ElementRef;

  port: string;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.port = this.route.snapshot.parent.params.port;
    this.dataService.createAddress(this.port).subscribe((address) => {
      this.searchInput.nativeElement.value = address;
    });
  }

}
