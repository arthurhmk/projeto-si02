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
    this.update();
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
        if(!this.coins[0] || this.coins[0].bpi.BRL.rate_float!=data.bpi.BRL.rate_float){
          this.coins.unshift(data);
          this.showupdater();
        }
        this.starttimer();
      })
  }

  showupdater(){
    //DOM element only pops up at coin[1] to avoid errors, and the function responsible for refreshing the page 
    //only runs AFTER this one so I can't capture the element on the second bitcoin update so now I have to make do with the third update.
    if(!(!this.coins[2])){
      let window = document.querySelector('#updater');
      window.classList.remove('disabled');//sometimes this doesn't get removed for whatever reason
      window.classList.add('updater');//add !imporant to this one <---
      setTimeout(()=>{
        window.classList.add('disabled');
        window.classList.remove('updater');
      },6000);
    }
  }
}
