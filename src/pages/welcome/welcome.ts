import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';


/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

	logged= false;
  scanning = false;
  images: any;
	
  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage) {
      this.nativeStorage.getItem("user").then(user =>{
        this.logged = true;
      }, error => {
        this.logged = false;
      })
   }

   

  scan(){
   this.navCtrl.push('ScanPage');
    
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  upload(){
    this.navCtrl.push('UploadPage');
  }

  logout(){
    this.nativeStorage.remove("user").then(data => {
      this.logged = false;
    });
  }

  clear(){
    this.nativeStorage.remove("images");
  }
}
