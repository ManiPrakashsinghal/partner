import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://driveronapp.com/Admin/api/driverApp/index.php';
//let apiUrl = 'http://127.0.0.1/demo/Admin/api/driverApp/index.php';


/*
  Generated class for the PostServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostServiceProvider {

  constructor(public http:Http) {
    console.log('Hello PostServiceProvider Provider');
  }


  registerDriver(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let apiData = {"dataMode":"register","data":data};
      this.http.post(apiUrl, JSON.stringify(apiData), {headers: headers})
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
    });

  }	


  loginDriver(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let apiData = {"dataMode":"login","data":data};
      this.http.post(apiUrl, JSON.stringify(apiData), {headers: headers})
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
    });

  }	

  giveAttendance(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let apiData = {"dataMode":"giveAttendance","data":data};
      this.http.post(apiUrl, JSON.stringify(apiData), {headers: headers})
        .subscribe(res => {
          console.log(res);
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
    });
  }
  
  getProfileDetail(id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let apiData = {"dataMode":"getProfileDetail","id":id};
      this.http.post(apiUrl, JSON.stringify(apiData), {headers: headers})
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
    });
  }

  getBookingHistory(id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let apiData = {"dataMode":"getBookingHistory","id":id};
      this.http.post(apiUrl, JSON.stringify(apiData), {headers: headers})
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
    });
  }


  getCurrentBooking(id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let apiData = {"dataMode":"getCurrentBooking","id":id};
      this.http.post(apiUrl, JSON.stringify(apiData), {headers: headers})
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
    });
  }

  getBookingDetail(id){

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let apiData = {"dataMode":"getBookingDetail","id":id};
      this.http.post(apiUrl, JSON.stringify(apiData), {headers: headers})
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
    });

  }

  updateTime(apiData){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(apiUrl, JSON.stringify(apiData), {headers: headers})
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
    });
  }

  updateReting(retingVal,bookingId){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let apiData = {"dataMode":"updateReting","RetVal":retingVal,"bookingId":bookingId};
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(apiUrl, JSON.stringify(apiData), {headers: headers})
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
    });
  }

  getVersion(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let apiData = {"dataMode":"getVersion"};
      this.http.post(apiUrl, JSON.stringify(apiData), {headers: headers})
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
    });
  }


  sendLocation(id,long,lat){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let apiData = {"dataMode":"currentLocation","id":id,"lng":long,"lat":lat};
      this.http.post(apiUrl, JSON.stringify(apiData), {headers: headers})
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
    });
  }





}


