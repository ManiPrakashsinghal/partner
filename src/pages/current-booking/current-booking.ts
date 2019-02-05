import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { ShareProvider } from '../../providers/share/share';
import { TripDetailsPage } from '../trip-details/trip-details';
import { RideInitiatePage } from '../ride-initiate/ride-initiate';

/**
 * Generated class for the CurrentBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-current-booking',
  templateUrl: 'current-booking.html',
})
export class CurrentBookingPage {

  currentData:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
    public share:ShareProvider) {
      var id = this.share.getDriverId();
      this.getCurrentBooking(id);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentBookingPage');
  }

  getCurrentBooking(id){
    this.loaderService.startLoader("Loading...");
  
    this.postService.getCurrentBooking(id).then((result) => {
      console.log(result);
      this.loaderService.stopLoader();
      this.currentData = result;
    }, (err) => {
      this.loaderService.stopLoader();
      this.loaderService.showToase(err);
    });
 }

 viewBooking(obj){
   
  this.navCtrl.push(RideInitiatePage,{"data":obj});
 }
 
}
