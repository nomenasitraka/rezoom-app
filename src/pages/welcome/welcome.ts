import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

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

	data={

	};
	option: BarcodeScannerOptions;	
  constructor(public navCtrl: NavController,public barcodeScanner: BarcodeScanner) { }

  scan(){
  	this.option = {
  		prompt: "Scannez votre QR Code"
  	}
  	this.barcodeScanner.scan(this.option).then(barcodeData => {
		 console.log('Barcode data', barcodeData);
		 this.data = barcodeData;
		}).catch(err => {
		    console.log('Error', err);
		});
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
