import { AlertController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { AttendancePage } from '../pages/attendance/attendance';

import { BookingHistoryPage } from '../pages/booking-history/booking-history';

import { HelpSupportPage } from '../pages/help-support/help-support';
import { CurrentBookingPage } from '../pages/current-booking/current-booking';
import { LoaderServiceProvider } from '../providers/loader-service/loader-service';
import { PostServiceProvider } from '../providers/post-service/post-service';
import { ShareProvider } from '../providers/share/share';
import {Storage} from '@ionic/storage';
import { StarRatingPage } from '../pages/star-rating/star-rating';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SharePage } from '../pages/share/share';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  templateUrl: 'app.html'
})
 

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  userName:any="user name";
  isExistShow:any=true;

 // rootPage: any = WelcomePage;

  pages: Array<{title: string, icon: string, component: any}>;
  
  constructor(private alertCtrl: AlertController, public platform: Platform, public statusBar: StatusBar,
     public splashScreen: SplashScreen,
     public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
    public share:ShareProvider,public storage:Storage,private diagnostic: Diagnostic,private geo: Geolocation) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', icon: 'contact', component: ProfilePage },
    //   { title: 'Home', icon: 'home', component: HomePage },
      { title: 'New Bookings', icon: 'analytics', component: CurrentBookingPage },
      { title: 'Booking History', icon: 'filing', component: BookingHistoryPage },
      { title: 'Attendance', icon: 'thumbs-up', component: AttendancePage },
      { title: 'Share', icon: 'share', component: SharePage},
    ];

    this.storage.get('loginId').then(loginId=>{
      console.log('loginId: '+ loginId);
      if(loginId){
      this.share.setDriverId(loginId);

      var nIntervId = setInterval(this.sendLocation(), 1000);

      this.nav.setRoot(HomePage);
      }else{
        this.nav.setRoot(WelcomePage);
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.diagnostic.isLocationEnabled()
      .then((state) => {
          if (state){
              console.log("location on");
          } else {
          this.diagnostic.switchToLocationSettings();
          }
      }).catch(e => console.error(e));
      this.splashScreen.hide();

    });

  //back button code
this.platform.registerBackButtonAction((event) => {
 
  //console.log(this.nav.getActive().name);
  if(this.share.isHomePage()) {    // your homepage
     // this.platform.exitApp();
     if(this.isExistShow){
     this.ExitConfirm();
     }
  }
  else {
      if(this.nav.canGoBack()){
          this.nav.pop();
      }else{
        this.storage.get('loginId').then(loginId=>{
          console.log('loginId: '+ loginId);
          if(loginId){
          this.share.setDriverId(loginId);
          this.nav.setRoot(HomePage);
          }else{
            this.nav.setRoot(WelcomePage);
          }
        });
    
      }
  }
},101);    

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.nav.push(page.component);
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Logout',
      message: 'Do you want to Logout?',
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
            this.offlineWithLogOut();
          }
        }
      ]
    });
    alert.present();
  }

  offlineWithLogOut(){
    var DriverId = this.share.getDriverId();
    let data = {'dataMode':'changeDutyModeOffline',id:DriverId};
    console.log(data);
    this.loaderService.startLoader("loading....");
    this.postService.updateTime(data).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);
      let status = result["status"];
      if(status){
        this.storage.remove("loginId");
        this.nav.setRoot(WelcomePage);
      }else{
        var msg = result["message"];
        this.loaderService.showToase(msg);
      }
    }, (err) => {
     this.loaderService.stopLoader();
     this.loaderService.showToase(err);
    });
  }
  
  public setUSerName(name){
      this.userName = name;
  }


  ExitConfirm() {
    this.isExistShow = false;
    let alert = this.alertCtrl.create({
      title: 'Confirm Exit',
      message: 'Do you want to Exit?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.isExistShow = true;
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.isExistShow = true;
            console.log('Yes clicked');
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }

  sendLocation(){

    var DriverId = this.share.getDriverId();
    this.getLocation(DriverId);
    
  }

  getLocation(id){
    console.log("send get location call");
    var appObj = this;
  
     this.geo.watchPosition().subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      console.log("watchPosition");
      //alert(data.coords.latitude);
       var latitude =  data.coords.latitude;
       var longitude =  data.coords.longitude;
       appObj.postService.sendLocation(id,longitude,latitude).then((result) => {
         console.log("current location send result ");
         console.log(result);
       }, (err) => {
       console.log(err);
       });
     });
  }
  
  
}
