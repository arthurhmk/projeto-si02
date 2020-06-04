import { Injectable } from '@angular/core';
import { BitcoinService } from './bitcoin.service';

type TradeHistory = {
  bought: boolean,
  oldcash: number,
  newcash: number,
  newcurr: number
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
    let oldmoney = qt>0? this.cashmoney:this.bitmoney;
    this.bitmoney+=qt;
    this.cashmoney+=qt*this.bitcoin.coins[0].bpi.BRL.rate_float;
    this.addtradehistory(qt,oldmoney);
  }

  addtradehistory(qt:number, oldmoney:number){
    if(qt>0){
      this.trades.unshift(<TradeHistory>{
        bought:true,
        oldcash:oldmoney,
        newcash:this.cashmoney,
        newcurr:qt
      });
    }
    else{
      this.trades.unshift(<TradeHistory>{
        bought:false,
        oldcash:oldmoney,
        newcash:this.bitmoney,
        newcurr:qt
      });
    }
  }
}
