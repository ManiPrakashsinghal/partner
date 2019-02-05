import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { ShareProvider } from '../../providers/share/share';
import { TripDirectionPage } from '../trip-direction/trip-direction';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';


/**
 * Generated class for the DirectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-direction',
  templateUrl: 'direction.html',
})
export class DirectionPage {

    @ViewChild('map') mapElement: ElementRef;
  //  @ViewChild('directionsPanel') directionsPanel: ElementRef;
    map: any;
    latitude:any;
    longitude:any;

    directionsService:any;
    directionsDisplay:any;
    TripDetail:any;
    desLat:any;
    desLng:any
    

 
    constructor(public navCtrl: NavController,private geo: Geolocation,public navParams: NavParams,
        private platform : Platform,public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
        public share:ShareProvider, private launchNavigator: LaunchNavigator) {

        this.TripDetail = this.navParams.get('data');
         this.desLat = Number(this.TripDetail.latitude);
         this.desLng = Number(this.TripDetail.longitude);
  

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
      
      var originPlace = new google.maps.LatLng(latitude,longitude);
      var destination = new google.maps.LatLng(this.desLat,this.desLng);
 
         this.directionsService = new google.maps.DirectionsService;
         this.directionsDisplay = new google.maps.DirectionsRenderer;
 
        this.directionsDisplay.setMap(this.map);
       // this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);
 
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


 private setCurrentPosition() {
   
    var options = {
        enableHighAccuracy:true
    };
    
    
    this.geo.getCurrentPosition(options).then(resp => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
    }).catch(() => {
        console.log("Error to get location setCurrentPosition");
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
 

      updateArrivedTime(){

        let data = {'dataMode':'updateArrivedTime',id:this.TripDetail.id};
        console.log(data);
        this.loaderService.startLoader("loading....");
        this.postService.updateTime(data).then((result) => {
          this.loaderService.stopLoader();
          console.log(result);
          let status = result["status"];
          if(status){
            this.TripDetail["arrived_time"] =  result["time"];
            //this.next2();
            this.navCtrl.setRoot(TripDirectionPage,{"data":this.TripDetail})
          }else{
            var msg = result["message"];
            this.loaderService.showToase(msg);
          }
        }, (err) => {
         this.loaderService.stopLoader();
         this.loaderService.showToase(err);
        });
    
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
