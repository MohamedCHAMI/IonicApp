import { Component, OnInit } from '@angular/core';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-interstitial',
  templateUrl: './interstitial.page.html',
  styleUrls: ['./interstitial.page.scss'],
})
export class InterstitialPage implements OnInit {

  constructor( private admobFree: AdMobFree) { }

  ngOnInit() {
  }
  ionViewDidLoad(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: true,
      autoShow: true,
      id: "ca-app-pub-3940256099942544/6300978111" // test AD
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {
    }).catch(e => alert(e));
  }

}
