import { LoadingController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoaderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoaderServiceProvider {

  loading:any;

  constructor(  public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    console.log('Hello LoaderServiceProvider Provider');
  }

startLoader(msg){

this.loading = this.loadingCtrl.create({
    content: msg
});

this.loading.present();
}

stopLoader(){
  this.loading.dismiss();
}


showToase(msg){
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom',
    dismissOnPageChange: true
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}


}
