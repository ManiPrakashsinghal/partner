import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing} from '@ionic-native/social-sharing';


/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {

  recipeUrl: any = "http:driveronapp.com";
  description: any = "Application where you can book your driver according to  hourly payment.";
  title: any = "DriverOnApp";
  constructor(public navCtrl: NavController, public navParams: NavParams,public sharingVar:SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePage');
  }

  shareRecipe(){
    this.sharingVar.share("Partner App",null/*Subject*/,null/*File*/,"https://play.google.com/store/apps/details?id=com.singhal.partnerApp")
    .then(()=>{
        console.log("Success");
      },
      ()=>{
         console.log("failed")
      })
    }
}
