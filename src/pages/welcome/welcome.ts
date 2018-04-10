import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, Loading } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';

import { RezoomProvider } from '../../providers/rezoom/rezoom';




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
  loading: Loading;
	
  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    private network: Network,
    public rezoom: RezoomProvider
    ) {
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

  

  importDatas(){
    this.loading = this.loadingCtrl.create({
        content: 'Importation des données...',
    });
    this.loading.present();

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.

       
          this.rezoom.importDatas().subscribe(datas => {
              this.loading.dismissAll();
              console.log(datas);
              this.nativeStorage.setItem("lieux", datas).then(d => {
                alert("Données importées avec succès!");
              });

            });
       
      
    });



    // stop connect watch
    connectSubscription.unsubscribe();

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.loading.dismissAll();
       alert("Vous n'êtes pas connecté. Conectez-vous à un réseau wifi!");
    });

  // stop disconnect watch
  disconnectSubscription.unsubscribe();
            
  }
}
