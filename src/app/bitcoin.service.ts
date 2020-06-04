import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Coin = {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  bpi: {
    [key in 'BRL' | 'USD']: {
      code: string;
      description: string;
      rate: string;
      rate_float: number;
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  public maxt = 60;
  public t: any;
  public timer;
  public bitcoin: Coin[] = [];

  constructor(private http: HttpClient) { 
    this.starttimer();
  }

  starttimer(){
    this.t = this.maxt;
    this.timer = setInterval(function(){
      if(this.t==1){
        clearInterval(this.timer);
        this.update();
      }
      else
        this.t--;
    },1000);
  }

  update(){
    this.t = 'updating...';
    this.http.get<Coin>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json').subscribe(function(data){
      this.bitcoin.unshift(data);
      this.starttimer();
    })
  }
}
