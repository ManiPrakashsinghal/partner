import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { RegisterPage } from '../register/register';
import { ShareProvider } from '../../providers/share/share';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  email_id:any ="";
  auth_pswrd:any="";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loaderService:LoaderServiceProvider,public postService:PostServiceProvider,
    public share:ShareProvider,
    public menu: MenuController,
  public storage:Storage) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menu.swipeEnable(false);

  }

  onLogin(){

    let loginData = {'email':this.email_id,'password':this.auth_pswrd};
    console.log(loginData);
    this.loaderService.startLoader("loading....");
    this.postService.loginDriver(loginData).then((result) => {
      this.loaderService.stopLoader();
      console.log(result);

      let status = result["success"];
      if(status){
        let DriverId = result["id"];
        this.storage.set("loginId",DriverId);
        this.share.setDriverId(DriverId);
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

  onSignUP(){
    this.navCtrl.setRoot(RegisterPage);
  }

   
}
