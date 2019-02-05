import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  regData:any = {
    first_name:"",
    last_name:"",
    email_id:"",
    address:"",
    mobile_no:"",
    zip_code:"",
    licance_no:"",
    auth_pswrd:"",
    confirm_password:""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public postService:PostServiceProvider,public loaderService:LoaderServiceProvider,
    public menu: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.menu.swipeEnable(false);
  }

  onBack(){
    this.navCtrl.setRoot(LoginPage);
  }

  onRegister(){
    
    if(this.regData.confirm_password == this.regData.auth_pswrd){
        this.registerUser();
    }else{
      let err = "Password not matched. Please enter valid password.";
      this.loaderService.showToase(err);
    }

    //this.navCtrl.setRoot(OffDutyPage);
    console.log(this.regData);
  }

registerUser(){
  this.loaderService.startLoader("Register....");
  this.postService.registerDriver(this.regData).then((result) => {
   this.loaderService.stopLoader();
    console.log(result);
    let status = result["success"];
    if(status){
      this.navCtrl.setRoot(LoginPage);
    }else{
      let err = result["message"];
      this.loaderService.showToase(err);   
    }
  }, (err) => {
   this.loaderService.stopLoader();
   this.loaderService.showToase(err);
  });
}


}
