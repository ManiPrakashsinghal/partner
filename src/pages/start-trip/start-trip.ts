import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core'; 

import { Geolocation } from '@ionic-native/geolocation';
import { RideInitiatePage } from '../ride-initiate/ride-initiate';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';


/**
 * Generated class for the StartTripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { InvoicePage } from '../invoice/invoice';
import { ShareProvider } from '../../providers/share/share';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { DirectionPage } from '../direction/direction';
import { TripDirectionPage } from '../trip-direction/trip-direction';

//@IonicPage()
@Component({
  selector: 'page-start-trip',
  templateUrl: 'start-trip.html',
})
export class StartTripPage {

  countTo:any =  Date;
  now:any =  Date;
  public step_1: boolean = true;
  public step_2: boolean = false;
  public step_3: boolean = false;
  public step_4: boolean = false;


  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  companies: any = 0;

  TotalRideTimeShow:any;


  TripDetail:any = {
    "id": "0",
    'clientName':'',
    "client_id": "0",
    "driver_id": "0",
    "latitude": "00.0000000",
    "longitude": "00.0000000",
    'desLat':'00.0000000',
    'desLng':'00.0000000',
    "convPrice": "00",
    "discount": "0",
    "tax": "0",
    "actualPrice": "00",
    "night_charge": "00",
    "pick_location": " ",
    "drop_location": "NULL",
    "tripType": " ",
    "carType": " ",
    "gearType": " ",
    "start_time": "",
    "end_time": "",
    "status": "",
    "total_fair": "00"
  }; 
  bookingId:any = 0;

  lat = null;
  lng = null;

  desLat = null;
  desLng = null;


  @ViewChild("search")
  public searchElementRef;


  constructor(public navCtrl: NavController,public navParams: NavParams,
    public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
    public share:ShareProvider, private mapsAPILoader: MapsAPILoader,
    private geo: Geolocation,private alertCtrl: AlertController,
    private platform: Platform,
    private ngZone: NgZone,public callNumber:CallNumber,
    private launchNavigator: LaunchNavigator) {

      console.log(this.navParams.get('data'));
      this.TripDetail = this.navParams.get('data');
     /// this.TripDetail = this.navParams.get('data');
       this.bookingId = this.TripDetail.id;
       this.desLat = this.TripDetail.desLat;
       this.desLng = this.TripDetail.desLng;
       this.lat  = this.TripDetail.latitude;
       this.lng = this.TripDetail.longitude;

      // this.getBookingDetail();

      if(this.TripDetail["go_time"] != "0000-00-00 00:00:00"){
          this.navCtrl.setRoot(DirectionPage,{"data":this.TripDetail})
       }
       if(this.TripDetail["arrived_time"] != "0000-00-00 00:00:00"){
        this.navCtrl.setRoot(TripDirectionPage,{"data":this.TripDetail})
       } 
    //   if(this.TripDetail["start_time"] != "0000-00-00 00:00:00"){
    //    // alert("start time");
    //     this.next3();
    //  }

     this.TotalRideTimeShow = '';

    //  else if(this.TripDetail["end_time"] != "0000-00-00 00:00:00"){
    //       this.next3();
    //  }


    this.platform.ready().then(() => {

      var options = {
        timeout: 5000
      };

      this.geo.getCurrentPosition(options).then(resp => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      }).catch(() => {
        console.log("Error to get location");
      });

    });

    this.zoom = 12;
    //this.latitude = 26.922953;
    //this.longitude = 75.826794;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartTripPage');
    //set google maps defaults
    this.zoom = 12;
    this.latitude = 26.922953;
    this.longitude = 75.826794;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  //Tap When Started // goToTrip
  next1() {
    this.step_1 = false;
    this.step_2 = true;
  }
  //Tap When Arrived
  next2() {
    this.step_1 = false;
    this.step_2 = false;
    this.step_3 = true;
  }
  //Start Trip
  next3() {
    this.step_1 = false;
    this.step_2 = false;
    this.step_3 = false;
    this.step_4 = true;
    var startTime = this.TripDetail["start_time"];
    this.upTime(startTime);
  }

  //End Trip
  nextPage() {
    this.navCtrl.setRoot(InvoicePage,{"id":this.bookingId});
  }


  goToTrip(){

    let data = {'dataMode':'updateGoTime',id:this.bookingId};
    console.log(data);
    this.loaderService.startLoader("loading....");
    this.postService.updateTime(data).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);
      let status = result["status"];
      if(status){
        this.TripDetail["go_time"] = result["time"];
       this.navCtrl.push(DirectionPage,{"data":this.TripDetail})
        //this.next1();
      }else{
        var msg = result["message"];
        this.loaderService.showToase(msg);
      }
    }, (err) => {
     this.loaderService.stopLoader();
     this.loaderService.showToase(err);
    });

  }

  updateArrivedTime(){

    let data = {'dataMode':'updateArrivedTime',id:this.bookingId};
    console.log(data);
    this.loaderService.startLoader("loading....");
    this.postService.updateTime(data).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);
      let status = result["status"];
      if(status){
        this.TripDetail["arrived_time"] =  result["time"];
        this.next2();
      }else{
        var msg = result["message"];
        this.loaderService.showToase(msg);
      }
    }, (err) => {
     this.loaderService.stopLoader();
     this.loaderService.showToase(err);
    });

  }

  updateStartTime(){

    let data = {'dataMode':'updateStartTime',id:this.bookingId};
    console.log(data);
    this.loaderService.startLoader("loading....");
    this.postService.updateTime(data).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);
      let status = result["status"];
      if(status){
        this.TripDetail["start_time"] = result["time"];
        this.next3();
      }else{
        var msg = result["message"];
        this.loaderService.showToase(msg);
      }
    }, (err) => {
     this.loaderService.stopLoader();
     this.loaderService.showToase(err);
    });

  }

  endTrip(){

    let alert = this.alertCtrl.create({
      title: 'Confirm Exit',
      message: 'Do you want to End Trip ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.endTripConfirmed();
          }
        }
      ]
    });
    alert.present();
  }


  endTripConfirmed(){
    let data = {'dataMode':'updateEndTime',id:this.bookingId};
    console.log(data);
    this.loaderService.startLoader("loading....");
    this.postService.updateTime(data).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);
      let status = result["status"];
      if(status){
        this.TripDetail["end_time"] = result["time"];
        this.generateBill();
      }else{
        var msg = result["message"];
        this.loaderService.showToase(msg);
      }
    }, (err) => {
     this.loaderService.stopLoader();
     this.loaderService.showToase(err);
    });
  }

  generateBill(){
    let data = {'dataMode':'generateBill',id:this.bookingId};
    console.log(data);
    this.loaderService.startLoader("loading....");
    this.postService.updateTime(data).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);
      let status = result["status"];
      if(status){
        this.nextPage();
      }else{
        var msg = result["message"];
        this.loaderService.showToase(msg);
      }
    }, (err) => {
     this.loaderService.stopLoader();
     this.loaderService.showToase(err);
    });
  }



    upTime(countTo) {
      var temp = this;
    this.now = new Date();
    this.countTo = new Date(countTo);
    var difference = this.now - this.countTo;
  
    var days=Math.floor(difference/(60*60*1000*24)*1);
    var hours=Math.floor((difference%(60*60*1000*24))/(60*60*1000)*1);
    var mins=Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
    var secs=Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);
  
    this.TotalRideTimeShow = days+' Day: '+hours+' Hours: '+mins+' Minutes: '+secs+' Seconds';
  
    clearTimeout(upTimeTto);
    var upTimeTto =setTimeout(function(){temp.upTime(temp.countTo)},1000);
  }

  getBookingDetail(){
    var id = this.bookingId;
    this.loaderService.startLoader("Loading...");
    this.postService.getBookingDetail(id).then((result) => {
      console.log(result);
      this.loaderService.stopLoader();
      this.TripDetail = result["data"];
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

  startNavigationDes(){

  let options: LaunchNavigatorOptions = {
   // start: 'London, ON',
  // app: LaunchNavigator.APPS.UBER
  };

  var destination = [this.desLat, this.desLng];
  this.launchNavigator.navigate(destination,options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
}


startNavigation(){

  let options: LaunchNavigatorOptions = {
   // start: 'London, ON',
  // app: LaunchNavigator.APPS.UBER
  };

  var destination = [this.lat, this.lng];
  this.launchNavigator.navigate(destination,options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
}

  



}
