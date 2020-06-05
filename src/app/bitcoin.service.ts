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
    let cointest: Coin = {
      time:	{
        updated:	"Jun 5, 2020 12:49:00 UTC",
        updatedISO:	"2020-06-05T12:49:00+00:00",
        updateduk:	"Jun 5, 2020 at 13:49 BST",
      },
      disclaimer:	"This data was produced from th…te from openexchangerates.org",
      bpi:	{
        USD:	{
          code: "USD",
          rate:	"9,684.3597",
          description: "United States Dollar",
          rate_float:	9684.3597
        },
        BRL:	{
          code:	"BRL",
          rate:	"49,570.3627",
          description:	"Brazilian Real",
          rate_float:	49570.3627
        }
      }
    }
    this.coins.unshift(cointest);
    cointest = {
      time:	{
        updated:	"Jun 5, 2020 12:50:00 UTC",
        updatedISO:	"2020-06-05T12:49:00+00:00",
        updateduk:	"Jun 5, 2020 at 13:49 BST",
      },
      disclaimer:	"This data was produced from th…te from openexchangerates.org",
      bpi:	{
        USD:	{
          code: "USD",
          rate:	"9,684.3597",
          description: "United States Dollar",
          rate_float:	9684.3597
        },
        BRL:	{
          code:	"BRL",
          rate:	"50,570.3627",
          description:	"Brazilian Real",
          rate_float:	50570.3627
        }
      }
    }
    this.coins.unshift(cointest);
    this.coins.unshift(cointest);

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
        if(!this.coins[0] || this.coins[0].bpi.BRL.rate_float!=data.bpi.BRL.rate_float)
          this.coins.unshift(data);
        this.starttimer();
      })
  }
}
