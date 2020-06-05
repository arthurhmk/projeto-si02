import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../bitcoin.service';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  public buy:string = "0";
  public sell:string = "0";
  public buyprev:number = 0;
  public sellprev:number = 0;

  constructor(public bitcoin:BitcoinService, public market:MarketService) { }

  ngOnInit(): void {
  }

  trade(buying:boolean){
    if(buying)
      this.market.trade(parseFloat(parseFloat(this.buy).toFixed(8)))
    else
      this.market.trade(-parseFloat(parseFloat(this.sell).toFixed(8)));
      this.buy = "0";
      this.sell = "0";
      this.buyprev = 0;
      this.sellprev = 0;
  }

  validatekey(e:any,buying:boolean){
    if(e.target.value[e.target.value.length-1]!="." && e.target.value[e.target.value.length-1]!=0){
      let aux = parseFloat(e.target.value)
      aux=isNaN(aux)?0:aux;
      e.target.value = aux;

      if(buying){
        if(aux*this.bitcoin.coins[0].bpi.BRL.rate_float>this.market.cashmoney)
          e.target.value = (this.market.cashmoney/this.bitcoin.coins[0].bpi.BRL.rate_float).toFixed(8);
        this.buy = e.target.value;
        this.buyprev = parseFloat(this.buy)*this.bitcoin.coins[0].bpi.BRL.rate_float;
      }
      else{
        if(aux>this.market.bitmoney)
          e.target.value = (this.market.bitmoney).toFixed(8);
        this.sell = e.target.value;
        this.sellprev = parseFloat(this.sell)*this.bitcoin.coins[0].bpi.BRL.rate_float;
      }
    }
    console.log(this.sell);
  }

}
