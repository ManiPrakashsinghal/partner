import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, MenuController, AlertController } from 'ionic-angular';
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core'; 

import { Geolocation } from '@ionic-native/geolocation';
import { RideInitiatePage } from '../ride-initiate/ride-initiate';
import { ShareProvider } from '../../providers/share/share';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { Market } from '@ionic-native/market';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    companies: any = 0;

    dutyMode:any = false;

    @ViewChild("search")
    public searchElementRef;
   

  constructor(public navCtrl: NavController, private mapsAPILoader: MapsAPILoader,
              private geo: Geolocation,
              private platform : Platform,
              private ngZone: NgZone,
            public share:ShareProvider,public menu: MenuController,
            public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
        public market:Market,public alertCtrl:AlertController)  {

    this.share.setIsHomePage(true);
    var homePageObj = this;

    this.platform.ready().then(() => {

        var options = {
            timeout: 5000,
            enableHighAccuracy:true
        };
        
        
        this.geo.getCurrentPosition(options).then(resp => {
            console.log(resp.coords.latitude);
            console.log(resp.coords.longitude);
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            this.zoom = 18;
        }).catch(() => {
                this.latitude = 26.9124;
                this.longitude = 75.7873;
                homePageObj.setCurrentPosition();
        });
    
        });
      
      this.zoom = 10;
      //this.latitude = 26.922953;
      //this.longitude = 75.826794;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
      this.setCurrentPosition();

      var DriverId = share.getDriverId();
      console.log("driver id is "+DriverId);
    
  }

  ionViewWillEnter(){
    this.share.setIsHomePage(true);
  }


  ionViewWillLeave(){
    this.share.setIsHomePage(false);
  }

  ionViewDidLeave() {
        this.share.setIsHomePage(false);
  }

  ionViewDidLoad() {

    this.share.setIsHomePage(true);
    this.getVersion();
   
    this.getDutyMode();        

    this.menu.swipeEnable(true);

      //set google maps defaults
      this.zoom = 10;
      this.latitude = 26.9124;
      this.longitude = 75.7873;

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
                  this.zoom = 18;
              });
          });
      });
  }

     private setCurrentPosition() {
    
        var homePage = this;

     var options = {
            timeout: 5000,
            enableHighAccuracy:true
        };
        
        
        this.geo.getCurrentPosition(options).then(resp => {
            console.log(resp.coords.latitude);
            console.log(resp.coords.longitude);
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            this.zoom = 18;
        }).catch(() => {
            console.log("Error to get location");
            homePage.setCurrentPosition();
        });

    }

    offDuty(){
        var DriverId = this.share.getDriverId();
        let data = {'dataMode':'changeDutyModeOffline',id:DriverId};
            this.changeDutyMode(data);
    }

    onDuty(){
        var DriverId = this.share.getDriverId();
        let data = {'dataMode':'changeDutyModeOnline',id:DriverId};
        this.changeDutyMode(data);
    }

changeDutyMode(data){
    
    console.log(data);
    this.loaderService.startLoader("loading....");
    this.postService.updateTime(data).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);
      let status = result["status"];
      if(status){
            this.share.setDutyMode(!this.dutyMode);
            this.dutyMode = !this.dutyMode;
      }else{
        var msg = result["message"];
        this.loaderService.showToase(msg);
      }
    }, (err) => {
     this.loaderService.stopLoader();
     this.loaderService.showToase(err);
    });
}


getDutyMode(){
    
    var DriverId = this.share.getDriverId();
    let data = {'dataMode':'getDutyMode',id:DriverId};

    console.log(data);
    this.loaderService.startLoader("loading....");
    this.postService.updateTime(data).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);
      let status = result["status"];
     if(status == "true"){
        // alert("online h ");
         this.dutyMode = true;
         this.share.setDutyMode(true);
     }else{
         //alert("offline h");
         this.dutyMode = false;
         this.share.setDutyMode(false);
     }
    }, (err) => {
     this.loaderService.stopLoader();
     this.loaderService.showToase(err);
    });
}

getVersion(){
    this.postService.getVersion().then((result) => {
      console.log(result);
      var serverVersion = parseInt(result["data"]);
      var appVersion = parseInt(this.share.getVersion());
      if(appVersion < serverVersion){
          ///alert("need to update");
          this.updateConfirm();
      }
    }, (err) => {
     this.loaderService.showToase(err);
    });

}


updateConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Update',
      message: 'New update available. Do you want to update ?',
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
            this.market.open('com.singhal.partnerApp');
          }
        }
      ]
    });
    alert.present();
  }




     
    nextPage(){
        this.navCtrl.push(RideInitiatePage);
    }
}