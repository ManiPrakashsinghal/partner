import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { ShareProvider } from '../../providers/share/share';
import { HomePage } from '../home/home';
import { DirectionPage } from '../direction/direction';

/**
 * Generated class for the AttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {

  attendMode:any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
  public shareService:ShareProvider) {

    this.getAttendMode();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
  }

  giveAttendance(){

    var dutyMode = this.shareService.getDutyMode();
    if(dutyMode){
      this.giveAttendanceApi();
    }else{
      this.loaderService.showToase("Please first do duty mode Online."); 
    }

    this.navCtrl.push(DirectionPage);

  }

  giveAttendanceApi(){
    var driverId = this.shareService.getDriverId();
    let attendData = {'status':true,'id':driverId};
    console.log(attendData);
    this.loaderService.startLoader("loading....");
    this.postService.giveAttendance(attendData).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);
     let status = result["status"];
      if(status){
        var msg = result["message"];
        //this.loaderService.showToase(msg);
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



    getAttendMode(){
    
      var DriverId = this.shareService.getDriverId();
      let data = {'dataMode':'getAttendMode',id:DriverId};
  
      console.log(data);
      this.loaderService.startLoader("loading....");
      this.postService.updateTime(data).then((result) => {
        this.loaderService.stopLoader();
        console.log(result);
        let status = result["status"];
       if(status == "true"){
          // alert("online h ");
           this.attendMode = true;
       }else{
           //alert("offline h");
           this.attendMode = false;
       }
      }, (err) => {
       this.loaderService.stopLoader();
       this.loaderService.showToase(err);
      });
  }
  


  }
