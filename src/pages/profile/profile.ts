import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { ShareProvider } from '../../providers/share/share';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

   profileObj:any = {
     'first_name':"",
     'last_name':'',
     'email_id':'',
     'address':'',
     'mobile_no':'',
     'zip_code':'',
     'licance_no':''
   };

  constructor(public navCtrl: NavController, public navParams: NavParams, public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
    public share:ShareProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    var driverId = this.share.getDriverId();
    this.getProfileDetail(driverId);
  }


  getProfileDetail(id){

    this.loaderService.startLoader("loading....");
      this.postService.getProfileDetail(id).then((result) => {
        this.loaderService.stopLoader();
         console.log(result);
        this.profileObj = result["data"];
      }, (err) => {
        this.loaderService.stopLoader();
        this.loaderService.showToase(err);
      });
  }

}
