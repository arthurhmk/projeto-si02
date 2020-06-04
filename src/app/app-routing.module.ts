import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { BitcoinComponent } from './bitcoin/bitcoin.component';
import { MarketComponent } from './market/market.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'bitcoin', component: BitcoinComponent },
  { path: 'market', component: MarketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
