import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { RezoomProvider } from '../../providers/rezoom/rezoom';
import {LieuDetailPage} from '../../pages/lieu-detail/lieu-detail';


/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public qrScanner: QRScanner, public rezoom: RezoomProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  data={

	};

  ionViewWillEnter(){

  	

  	this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            /*alert('Scanned something '+ text);
*/          
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            try{
              this.data = JSON.parse(text);
              if(typeof this.data.id != undefined){
              	this.navCtrl.push('LieuDetailPage', {id_lieu: this.data.id});
              }else{
              	alert("Error : "+this.data)
              }

              

            }catch(e){
              alert("QR Code non valide!");

            }
          }); 

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show().then((data2: QRScannerStatus) =>{
            /*alert("datashowing: "+ data2.showing);*/
          } );

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          alert('Denied');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          /*alert('else')*/
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      }).catch((e: any) => {alert('Error :'+ e); this.navCtrl.push('LieuDetailPage', {id_lieu: 616}); });
  }

}
