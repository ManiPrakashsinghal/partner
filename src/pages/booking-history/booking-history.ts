import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookingHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { TripDetailsPage } from '../trip-details/trip-details';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { ShareProvider } from '../../providers/share/share';


@Component({
  selector: 'page-booking-history',
  templateUrl: 'booking-history.html',
})
export class BookingHistoryPage {

  bookingData:any = [];
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
    public share:ShareProvider) {
      var id = this.share.getDriverId();
      this.getBokingHistory(id);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingHistoryPage');
  }

  getBokingHistory(id){
    this.loaderService.startLoader("Loading...");
  
    this.postService.getBookingHistory(id).then((result) => {
      console.log(result);
      this.loaderService.stopLoader();
      this.bookingData = result;
    }, (err) => {
      this.loaderService.stopLoader();
      this.loaderService.showToase(err);
    });
}

  tripDetail(obj){
    this.navCtrl.push(TripDetailsPage,{"data":obj});
  }
}
