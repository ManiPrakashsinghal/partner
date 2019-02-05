import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RideInitiatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


import { StartTripPage } from '../start-trip/start-trip';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { ShareProvider } from '../../providers/share/share';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-ride-initiate',
  templateUrl: 'ride-initiate.html',
})
export class RideInitiatePage {

  TripDetail:any = {
    "id": "0",
    'clientName':'',
    "client_id": "0",
    "driver_id": "0",
    "latitude": "00.0000000",
    "longitude": "00.0000000",
    "convPrice": "00",
    "discount": "0",
    "tax": "0",
    "actualPrice": "00",
    "night_charge": "00",
    "pick_location": " ",
    "drop_location": "",
    "tripType": " ",
    "carType": " ",
    "gearType": " ",
    "start_time": "",
    "end_time": "",
    "status": "",
    "total_fair": "00"
  }; 

  bookingId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
    public share:ShareProvider,public callNumber:CallNumber) {
    console.log(this.navParams.get('data'));
    this.TripDetail = this.navParams.get('data');

    if(this.TripDetail["initiate_time"] != "0000-00-00 00:00:00"){
      this.navCtrl.setRoot(StartTripPage,{"data":this.TripDetail});
    }

    this.bookingId = this.TripDetail.id;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RideInitiatePage');
    //this.callInNumber();
  }

  nextPage(){
    //this.navCtrl.setRoot(StartTripPage);
    let data = {'dataMode':'updareInitiateTime',id:this.bookingId};
    console.log(data);
    this.loaderService.startLoader("loading....");
    this.postService.updateTime(data).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);
      let status = result["status"];
      if(status){

        //remove if set this value  by driver assign
        this.TripDetail["go_time"] = "0000-00-00 00:00:00";
        this.TripDetail["arrived_time"] = "0000-00-00 00:00:00";
        this.TripDetail["end_time"] = "0000-00-00 00:00:00";
        this.TripDetail["start_time"] = "0000-00-00 00:00:00";

        this.navCtrl.setRoot(StartTripPage,{"data":this.TripDetail});
      }else{
        var msg = result["message"];
        this.loaderService.showToase(msg);
      }
    }, (err) => {
     this.loaderService.stopLoader();
     this.loaderService.showToase(err);
    });
  }

  callInNumber(no){
    this.callNumber.callNumber(no, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }


}
