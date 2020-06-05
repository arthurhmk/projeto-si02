import { Injectable } from '@angular/core';
import { BitcoinService } from './bitcoin.service';

type TradeHistory = {
  time:Date;
  oldcash: number,
  newcash: number,
  oldbit: number,
  newbit: number,
  bitcoinprice:number
}

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  public cashmoney = 1000;
  public bitmoney = 0;
  public trades: TradeHistory[] = []

  constructor(public bitcoin: BitcoinService) { }

  trade(qt:number){
    console.log(this.bitmoney+qt);
    console.log(this.cashmoney-qt*this.bitcoin.coins[0].bpi.BRL.rate_float);
    if(this.bitmoney+qt>=0 
      && this.cashmoney-qt*this.bitcoin.coins[0].bpi.BRL.rate_float>=-9e-4
      && qt!=0){

      let oldcash = this.cashmoney;
      let oldbit = this.bitmoney;
      this.bitmoney+=qt;
      this.cashmoney-=qt*this.bitcoin.coins[0].bpi.BRL.rate_float;

      this.trades.unshift(<TradeHistory>{
        time:new Date(),
        oldcash:oldcash,
        newcash:this.cashmoney,
        oldbit:oldbit,
        newbit:this.bitmoney,
        bitcoinprice:this.bitcoin.coins[0].bpi.BRL.rate_float
      });
    }
  }
}
