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
  date_datas:any;

  all_datas:any;
	
  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    private network: Network,
    public rezoom: RezoomProvider
    ) {
      this.nativeStorage.getItem("user").then(user =>{
        this.logged = true;
      }, error => {
        this.logged = false;
      });

      
   }

  ionViewDidLoad() {
    this.nativeStorage.getItem("lieux").then( lieux => {
        this.date_datas = lieux.date;

    });
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
              this.loading.dismissAll();
              
              var d = Date.now();
              var date = new Date(d);
              var month = date.getMonth()+1;

              var date_now = date.getDate()+"/"+month+"/"+date.getFullYear()+" à "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
              this.nativeStorage.remove("lieux").then(rm => {
                  this.nativeStorage.setItem("lieux",  {"date": date_now, "value": datas}).then(d => {
                    this.date_datas = date_now;
                    alert("Données importées avec succès!");
                    
                  });
              })
                
              // var lieux  =  {"date": date_now, "value": datas}
              // let lieu = lieux.value.filter(elt =>  elt.lieu.id_lieux_rezoom == 622);
              // console.log(lieu);
              // console.log(lieux.date);

            });
    } else{
       alert("Vous n'êtes pas connecté. Conectez-vous à un réseau wifi!");
       this.loading.dismissAll();
    }

    

    
            
  }
}
