import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Loading, LoadingController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';


import { Storage } from '@ionic/storage';
import { RezoomProvider } from '../../providers/rezoom/rezoom';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  user: any;
  logged = false;
  loading: Loading;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public storage: Storage,
    public rezoom: RezoomProvider,
    public loadingCtrl: LoadingController
    ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.loading = this.loadingCtrl.create({
        content: 'Identification...',
    });
    this.loading.present();
      
      this.rezoom.login(this.account.identity, this.account.password).subscribe(datas =>{
        this.loading.dismissAll();
        console.log(datas);
        if(datas.status == "ok"){
          this.logged = true;
          this.user = datas.user;
        }else{
          alert("Erreur d'authentification");
        }
      });
    /*this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });*/
  }
}
