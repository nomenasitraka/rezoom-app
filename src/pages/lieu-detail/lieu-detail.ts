import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RezoomProvider } from '../../providers/rezoom/rezoom';

import { ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import { Camera } from '@ionic-native/camera';

declare var cordova: any;
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
	lastImage: string = null;
  	loading: Loading;

  	identity: any;
  	password:any;

  	logged = false;
  	user={};
  	date_lastImage:any;
  	date_now:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rezoom: RezoomProvider, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
  	this.id_lieu = this.navParams.get('id_lieu'); 
  }

  ionViewDidLoad() {
  	var d = Date.now();
	var date = new Date(d);
	var month = date.getMonth()+1;

	this.date_now = ""+date.getFullYear()+"-"+month+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  
  	this.rezoom.getLieu(this.id_lieu).subscribe(datas => {
  		console.log(datas);
  		this.lieu = datas.lieu;
  		this.campagnes = datas.campagnes;
  	});
    console.log('ionViewDidLoad LieuDetailPage');
  }

  login(){

  	this.loading = this.loadingCtrl.create({
	    content: 'Identification...',
	});
	this.loading.present();
  	
  	this.rezoom.login(this.identity, this.password).subscribe(datas =>{
  		this.loading.dismissAll();
  		console.log(datas);
  		if(datas.status == "ok"){
  			this.logged = true;
  			this.user = datas.user;
  		}else{
  			alert("Erreur d'authentification");
  		}
  	});
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Choisir l'image source",
      buttons: [
        {
          text: "Charger depuis l'album",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Utiliser la caméra',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Annuler',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
  	alert(sourceType)
	  // Create options for the Camera Dialog
	  var options = {
	    quality: 100,
	    sourceType: sourceType,
	    saveToPhotoAlbum: false,
	    correctOrientation: true
	  };
	 
	  // Get the data of an image
	  this.camera.getPicture(options).then((imagePath) => {
	    // Special handling for Android library
	    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
	      this.filePath.resolveNativePath(imagePath)
	        .then(filePath => {
	        	var d = Date.now();
	        	var date = new Date(d);
	        	var month = date.getMonth()+1;

	        	this.date_lastImage = ""+date.getFullYear()+"-"+month+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
	          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
	          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
	          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	        });
	    } else {
	      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
	      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
	      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	    }
	  }, (err) => {
	    this.presentToast('Error while selecting image.'+ err);
	  });
	}

	// Create a new name for the image
	private createFileName() {
	  var d = new Date(),
	  n = d.getTime(),
	  newFileName =  n + ".jpg";
	  return newFileName;
	}

	// Copy the image to a local folder
	private copyFileToLocalDir(namePath, currentName, newFileName) {
	  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
	    this.lastImage = newFileName;
	  }, error => {
	    this.presentToast('Error while storing file.');
	  });
	}
	 
	private presentToast(text) {
	  let toast = this.toastCtrl.create({
	    message: text,
	    duration: 3000,
	    position: 'top'
	  });
	  toast.present();
	}

	// Always get the accurate path to your apps folder
	public pathForImage(img) {
	  if (img === null) {
	    return '';
	  } else {
	    return cordova.file.dataDirectory + img;
	  }
	}

	public uploadImage() {
	  // Destination URL
	  var url = "http://www.rezoom.sopromer.com/mobile/photo";
	 
	  // File for Upload
	  var targetPath = this.pathForImage(this.lastImage);
	  alert("UPLOADING")
	 alert(targetPath);
	  // File name only
	  var filename = this.lastImage;
	 
	  var options = {
	    fileKey: "file",
	    fileName: filename,
	    chunkedMode: false,
	    mimeType: "multipart/form-data",
	    params : {'fileName': filename}
	  };
	 
	  const fileTransfer: TransferObject = this.transfer.create();

	   let reader = new FileReader();

	   reader.readAsDataURL(filename);
	 
	  this.loading = this.loadingCtrl.create({
	    content: 'Uploading...',
	  });
	  this.loading.present();
	 
	  // Use the FileTransfer to upload the image
	  fileTransfer.upload(targetPath, url, options).then(data => {
	    this.loading.dismissAll()
	    this.presentToast('Image succesful uploaded.');
	  }, err => {
	    this.loading.dismissAll()
	    this.presentToast('Error while uploading file. : '+ err);
	  });
	}

}
