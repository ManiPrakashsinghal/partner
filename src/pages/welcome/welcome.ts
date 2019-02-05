import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import {Storage} from '@ionic/storage';
import { ShareProvider } from '../../providers/share/share';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public menu: MenuController,
    public storage:Storage,public share:ShareProvider) {

      // this.storage.get('loginId').then(loginId=>{
      //   console.log('loginId: '+ loginId);
      //   if(loginId){
      //   this.share.setDriverId(loginId);
      //   this.navCtrl.setRoot(HomePage);
      //   }
      // });

  }

  ionViewDidLoad() {
    this.menu.close();
    this.menu.swipeEnable(false);
    console.log('ionViewDidLoad WelcomePage');
  }

  login(){
    this.navCtrl.push(LoginPage);
  }
  register(){
    this.navCtrl.push(RegisterPage);
  }

}
