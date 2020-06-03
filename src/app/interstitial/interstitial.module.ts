import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterstitialPageRoutingModule } from './interstitial-routing.module';

import { InterstitialPage } from './interstitial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterstitialPageRoutingModule
  ],
  declarations: [InterstitialPage]
})
export class InterstitialPageModule {}
