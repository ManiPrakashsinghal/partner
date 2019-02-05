import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { StarRatingPage  } from '../star-rating/star-rating';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { ShareProvider } from '../../providers/share/share';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {

  obj:any = {'convPrice':0, 'discount':0, 'tax':0, 'actualPrice':0, 'night_charge':0, 'total_fair':0,'extra_charges':0};
  bookingId:any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
    public share:ShareProvider) {
      this.bookingId =  this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
    this.getInvoiceDetail();
  }
  
  nextPage(){
    this.navCtrl.setRoot(StarRatingPage,{"bookingId":this.bookingId});
  }

getInvoiceDetail(){
  let data = {'dataMode':'getInvoice',id:this.bookingId};
  console.log(data);
  this.loaderService.startLoader("loading....");
  this.postService.updateTime(data).then((result) => {
    this.loaderService.stopLoader();
    console.log(result);
    this.obj = result[0];
  }, (err) => {
   this.loaderService.stopLoader();
   this.loaderService.showToase(err);
  });
}


}
