import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, Loading } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
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
  date_datas:any;

  all_datas:any;
	
  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    private network: Network,
    public rezoom: RezoomProvider,
    public storage: Storage
    ) {
      this.nativeStorage.getItem("user").then(user =>{
        this.logged = true;
      }, error => {
        this.logged = false;
      });

      
   }

  ionViewDidLoad() {

    this.nativeStorage.getItem('lieux').then((lieux) => {
        this.date_datas = lieux.date;
    });
  }

   

  scan(){
   this.navCtrl.push('ScanPage');
    
  }

  login() {
    if(navigator.onLine){
      this.navCtrl.push('LoginPage');
    }else{
      alert("Connectez vous à un réseau wifi!");
    }
    
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  upload(){
    if(navigator.onLine){
      this.navCtrl.push('UploadPage');
    }else{
      alert("Connectez vous à un réseau wifi!");
    }
    
  }

  logout(){
    this.nativeStorage.remove("user").then(data => {
      this.logged = false;
    });
  }

  

  importDatas(){
    
    // var networkState = navigator.connection.type;
    // var states = {};
    // states[Connection.UNKNOWN]  = 'Unknown connection';
    // states[Connection.ETHERNET] = 'Ethernet connection';
    // states[Connection.WIFI]     = 'WIFI';
    // states[Connection.CELL_2G]  = '2G';
    // states[Connection.CELL_3G]  = '3G';
    // states[Connection.CELL_4G]  = '4G';
    // states[Connection.CELL]     = 'Cell generic connection';
    // states[Connection.NONE]     = 'No network connection';

    if(navigator.onLine){
        this.loading = this.loadingCtrl.create({
          content: 'Importation des données...',
        });
        this.loading.present();
       
        this.rezoom.importDatas().subscribe(datas => {
              
              
              var d = Date.now();
              var date = new Date(d);
              var month = date.getMonth()+1;

              var date_now = (date.getDate() < 10 ? "0"+date.getDate() : date.getDate())+"/"+(month < 10 ? "0"+month : month)+"/"+date.getFullYear()+" à "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
              // this.nativeStorage.remove("lieux").then(rm => {
              //     this.nativeStorage.setItem("lieux",  {"date": date_now, "value": datas}).then(d => {
              //       this.date_datas = d.date_now;
              //       this.
              //       alert("Données importées avec succès!");
                    
              //     });
              // })



              console.log("storing");
              this.nativeStorage.setItem("lieux", {"date" : date_now, "lieux": datas});
              this.nativeStorage.getItem('lieux').then((lieux) => {
                  this.date_datas = lieux.date;
                  this.loading.dismissAll();
              });

            });
    } else{
       alert("Vous n'êtes pas connecté. Conectez-vous à un réseau wifi!");
       this.loading.dismissAll();
    }

    

    
            
  }
}
