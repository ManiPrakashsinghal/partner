import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { ShareProvider } from '../../providers/share/share';
import { InvoicePage } from '../invoice/invoice';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';


/**
 * Generated class for the TripDirectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-trip-direction',
  templateUrl: 'trip-direction.html',
})
export class TripDirectionPage {

    @ViewChild('map') mapElement: ElementRef;
   // @ViewChild('directionsPanel') directionsPanel: ElementRef;
    map: any;
    latitude:any;
    longitude:any;

    directionsService:any;
    directionsDisplay:any;
    TripDetail:any;
    desLat:any;
    desLng:any;

    step_3:any = true;
    step_4:any = false;
    
    countTo:any =  Date;
    now:any =  Date;
    TotalRideTimeShow:any;


 
    constructor(public navCtrl: NavController,private geo: Geolocation,public navParams: NavParams,
        private platform : Platform,public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
        public share:ShareProvider,private alertCtrl:AlertController,private launchNavigator: LaunchNavigator) {

        this.TripDetail = this.navParams.get('data');
         this.desLat = this.TripDetail.desLat;
         this.desLng = this.TripDetail.desLng;

         if(this.TripDetail["start_time"] != "0000-00-00 00:00:00"){
          // alert("start time");
          this.step_3 = false;
           this.step_4 = true;
           var startTime = this.TripDetail["start_time"];
           this.upTime(startTime);
        }
   
        this.TotalRideTimeShow = '';
  

        this.platform.ready().then(() => {
            });
    
 
    }
 
    ionViewDidLoad(){
 
      this.loadMap2();

  }

  loadMap(){

      let latLng = new google.maps.LatLng(this.latitude,this.longitude);

     
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  loadMap2(){

      this.geo.getCurrentPosition().then((position) => {
   
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
  
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   
        let mapOptions = {
          center: latLng,
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
   
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.startNavigating(this.latitude,this.longitude);
        this.getLocation();
   
      }, (err) => {
        console.log(err);
      });
   
    }
  
    startNavigating(latitude,longitude){

      console.log("Call startNavigating");

      var lat = Number(latitude);
      var lng = Number(longitude);
    
      var desLat = Number(this.desLat);
      var desLng = Number(this.desLng);

      var originPlace = new google.maps.LatLng(lat,lng);
      var destination = new google.maps.LatLng(desLat,desLng);
 
         this.directionsService = new google.maps.DirectionsService;
         this.directionsDisplay = new google.maps.DirectionsRenderer;
 
        this.directionsDisplay.setMap(this.map);
        //this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);
 
        this.directionsService.route({
            origin: originPlace,
            destination: destination,
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {
 
            if(status == google.maps.DirectionsStatus.OK){
                this.directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }
        });
 
    }


changeNavigation(latitude,longitude){


    var originPlace = new google.maps.LatLng(latitude,longitude);
    var destination = new google.maps.LatLng(this.desLat,this.desLng);

      this.directionsService.route({
          origin: originPlace,
          destination: destination,
          travelMode: google.maps.TravelMode['DRIVING']
      }, (res, status) => {
          if(status == google.maps.DirectionsStatus.OK){
              this.directionsDisplay.setDirections(res);
          } else {
              console.warn(status);
          }
      });

 }

    getLocation(){
       
         this.geo.watchPosition().subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
          console.log("watchPosition");
          //alert(data.coords.latitude);
           var latitude =  data.coords.latitude;
           var longitude =  data.coords.longitude;
           this.changeNavigation(latitude,longitude);
         });
      }


      updateStartTime(){

        let data = {'dataMode':'updateStartTime',id:this.TripDetail.id};
        console.log(data);
        this.loaderService.startLoader("loading....");
        this.postService.updateTime(data).then((result) => {
          this.loaderService.stopLoader();
          console.log(result);
          let status = result["status"];
          if(status){
            this.TripDetail["start_time"] = result["time"];
            //this.next3();
            this.step_3 = false;
            this.step_4 = true;
            var startTime = this.TripDetail["start_time"];
            this.upTime(startTime);
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
          title: 'Confirm End Trip.',
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
        let data = {'dataMode':'updateEndTime',id:this.TripDetail.id};
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
        let data = {'dataMode':'generateBill',id:this.TripDetail.id};
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

      nextPage() {
        this.navCtrl.setRoot(InvoicePage,{"id":this.TripDetail.id});
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

      startNavigation(){

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
    
    
 

}
