import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RezoomProvider } from '../../providers/rezoom/rezoom';

/**
 * Generated class for the LieuDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lieu-detail',
  templateUrl: 'lieu-detail.html',
})
export class LieuDetailPage {
	id_lieu :any;
	lieu={};
	campagnes=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public rezoom: RezoomProvider) {
  	this.id_lieu = this.navParams.get('id_lieu'); 
  }

  ionViewDidLoad() {
  	this.rezoom.getLieu(this.id_lieu).subscribe(datas => {
  		console.log(datas);
  		alert(datas);
  		this.lieu = datas.lieu;
  		this.campagnes = datas.campagnes;
  	});
    console.log('ionViewDidLoad LieuDetailPage');
  }

}
