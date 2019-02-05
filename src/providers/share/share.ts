import { Injectable } from '@angular/core';

/*
  Generated class for the ShareProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShareProvider {

  appVersion="20";

  driverId:any=0;
  dutyMode:any=false;
  isHomePageFlag:any= false;


  constructor() {
    console.log('Hello ShareProvider Provider');
  }

  getVersion(){
    return this.appVersion;
  }

  setDutyMode(status){
    this.dutyMode = status;
  }

  getDutyMode(){
   return this.dutyMode;
  }

  setDriverId(id){
    this.driverId  = id;
  }

  getDriverId(){
    return this.driverId;
  }

  isHomePage(){
    return this.isHomePageFlag;
  }


  setIsHomePage(val){
    this.isHomePageFlag = val;
  }
  


}
