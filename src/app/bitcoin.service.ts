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
  public coins: Coin[] = [];

  constructor(private http: HttpClient) { 
    //this.starttimer();
    this.t = 'start';
  }

  starttimer(){
    this.t = this.maxt;
    this.timer = setInterval(()=>{
      if(this.t==1)
        this.update();
      else
        this.t--;
    },1000);
  }

  update(){
    clearInterval(this.timer);
    this.t = 'updating...';
    this.http
      .get<Coin>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
      .subscribe((data)=>{
        this.coins.unshift(data);
        this.starttimer();
      })
  }
}
