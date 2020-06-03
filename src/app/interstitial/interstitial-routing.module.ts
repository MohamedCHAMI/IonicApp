import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterstitialPage } from './interstitial.page';

const routes: Routes = [
  {
    path: '',
    component: InterstitialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterstitialPageRoutingModule {}
