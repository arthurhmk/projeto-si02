import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../bitcoin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router:Router, public bitcoin: BitcoinService) { }

  ngOnInit(): void {
  }

}
