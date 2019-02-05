import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TripDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-trip-details',
  templateUrl: 'trip-details.html',
})
export class TripDetailsPage {

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
    "total_fair": "00",
    "extra_charges": "0"
  }; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('data'));
    this.TripDetail = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripDetailsPage');
    console.log(JSON.stringify(this.TripDetail));
  }

	 
}
