import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';
import { BitcoinComponent } from '../bitcoin/bitcoin.component';
import { BitcoinService } from '../bitcoin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public bitcoin: BitcoinService) { }

  ngOnInit(): void {
  }

}
