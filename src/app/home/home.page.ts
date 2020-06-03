import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'; import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  number;
  smallImg: any;
  databaseObj: SQLiteObject;
  name_model: string = "";
  row_data: any = [];
  readonly database_name: string = "MohamedCHAMIDB.db";
  readonly table_name: string = "MC_Name";
  constructor(private callNumber: CallNumber, private camera: Camera, private zbar: ZBar, private admobFree: AdMobFree,
    private sqlite: SQLite, private platform: Platform,private router: Router) {
    this.platform.ready().then(() => { this.createDB(); }).catch(error => { console.log(error); })
  }
  makeCall() {
    this.callNumber.callNumber(this.number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  cameraPreview() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.smallImg = 'data:image/jpeg;base64,' + imageData;
      console.log(this.smallImg)
    }, (err) => {
      // Handle error
    });
  }

  barScan() {
    let options: ZBarOptions = {
      flash: 'on',
      drawSight: false
    }

    this.zbar.scan(options)
      .then(result => {
        console.log(result); // Scanned code
      })
      .catch(error => {
        console.log(error); // Error message
      });
  }
  showBannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true,
      autoShow: true,
      id: "ca-app-pub-3940256099942544/6300978111" //test
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {
      // success
    }).catch(e => alert(e));
  }
  showInterstitialAds() {
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: true,
      autoShow: true,
      id: "ca-app-pub-3940256099942544/6300978111" // test AD
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {
    }).catch(e => alert(e));
  }

  showRewardVideoAds() {
    let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
      isTesting: true,
      autoShow: true,
      id: "ca-app-pub-3940256099942544/6300978111"// test ad
    };
    this.admobFree.rewardVideo.config(RewardVideoConfig);
    this.admobFree.rewardVideo.prepare().then(() => {
    }).catch(e => alert(e));
  }

  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        alert('MC Database Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  createTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' +
      this.table_name + " (pid INTEGER PRIMARY KEY, Name varchar(255))", [])
      .then(() => {
        alert('Table Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  insertRow() {
    if (!this.name_model.length) {
      alert("Enter Name");
      return;
    }
    this.databaseObj.executeSql('INSERT INTO ' + this.table_name +
      '(Name) VALUES("' + this.name_model + '")', [])
      .then(() => {
        alert('Row Inserted!');
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  getRows() {
    this.databaseObj.executeSql("SELECT * FROM " +
      this.table_name, [])
      .then((res) => {
        this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))

      });
  }
  deleteRow(item) {
    this.databaseObj.executeSql("DELETE FROM " + this.table_name
      + " WHERE pid = " + item.pid, [])
      .then((res) => {
        alert("Row Deleted!");
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  navigate(){
    this.router.navigate(['/interstitial'])
  }
}
