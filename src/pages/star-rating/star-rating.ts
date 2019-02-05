import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StarRatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { RideInitiatePage } from '../ride-initiate/ride-initiate';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { HomePage } from '../home/home';
import { ShareProvider } from '../../providers/share/share';

@Component({
  selector: 'page-star-rating',
  templateUrl: 'star-rating.html',
})
export class StarRatingPage {

  retingVal:any=0;
  rate:any = 3;
  bookingId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public postService:PostServiceProvider, public loaderService:LoaderServiceProvider,
  public shareService:ShareProvider) {
    this.bookingId =  this.navParams.get('bookingId');
  }

  onModelChange(event){
    console.log(event);
    this.retingVal = event;
  }

  submit(){
    //this.navCtrl.setRoot(RideInitiatePage);
    this.setReting();
  }

  setReting(){
    var retingVal = this.retingVal;
    var bookingId = this.bookingId;
    this.loaderService.startLoader("loading....");
    this.postService.updateReting(retingVal,bookingId).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);
      let status = result["status"];
      if(status){
        this.navCtrl.setRoot(HomePage);
      }else{
        var msg = result["message"];
        this.loaderService.showToase(msg);
      }
    }, (err) => {
     this.loaderService.stopLoader();
     this.loaderService.showToase(err);
    });
  }
  
  
}
