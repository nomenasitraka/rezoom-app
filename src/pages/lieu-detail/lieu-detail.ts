import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RezoomProvider } from '../../providers/rezoom/rezoom';

import { ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import { Camera } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';

import { EmailComposer } from '@ionic-native/email-composer';
import { Network } from '@ionic-native/network';


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

  	lieu_str:any;
  	base64:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rezoom: RezoomProvider, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public nativeStorage: NativeStorage,
  		private emailComposer: EmailComposer,
  		private network: Network
  	) {
  	this.id_lieu = this.navParams.get('id_lieu'); 

  	this.nativeStorage.getItem("user").then(data =>{
  		this.user = data;
  		this.logged = true;
  	}, error => {

  	})
  }

  ionViewDidLoad() {
  	var d = Date.now();
	var date = new Date(d);
	var month = date.getMonth()+1;

	this.date_now = ""+date.getFullYear()+"-"+month+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  	// watch network for a disconnect
  	var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WIFI';
    states[Connection.CELL_2G]  = '2G';
    states[Connection.CELL_3G]  = '3G';
    states[Connection.CELL_4G]  = '4G';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

	if(states[networkState] != "WIFI" && states[networkState] != "4G"){

	  this.nativeStorage.getItem("lieux").then( lieux => {
	  	alert("lieux storage exist");
	  	let lieu = lieux.value.filter(function(elt){
	  		return elt.lieu.id_lieux_rezoom == this.id_lieu;
	  	})
	  	this.lieu = lieu.lieu;
	  	alert(lieu.lieu.nom_lieux);
	  	this.campagnes = lieu.campagnes;

	  }, error => {
	  	alert("Vos données locales ne sont pas à jour, veuillez les mettre à jour en vous connectant sur wifi.");
	  	this.navCtrl.push("WelcomePage");
	  });
	};



	// watch network for a connection
	if(states[networkState] == "WIFI" || states[networkState] == "4G"){
	  console.log('network connected!');
	  // We just got a connection but we need to wait briefly
	   // before we determine the connection type. Might need to wait.
	  // prior to doing any api requests as well.
	
	    this.rezoom.getLieu(this.id_lieu).subscribe(datas => {
	  		
	  		this.lieu = datas.lieu;
	  		this.lieu_str = JSON.stringify(datas);
	  		this.campagnes = datas.campagnes;

	  	});

	};



  	
  }

  public login(){

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
  			this.nativeStorage.setItem("user", datas.user).then(data => {})
  		}else{
  			alert("Erreur d'authentification");
  		}
  	});
  }

  public signaler(){
  	

	this.emailComposer.requestPermission().then(permission => {
	 		if(permission){
	 			var d = new Date;
				

				let date_now= d.toString();
				/*let date_now= ""+date.getDate()+"-"+month+"-"+date.getFullYear()+" / "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();*/
		  
			    let email = {
				  to: 'contact@rezoom.re',
				 
			
				  subject: ""+ date_now+ " / "+this.lieu.nom_lieux,
				 
				  isHtml: true
				};
				this.emailComposer.open(email);
	 		}
	 	})
  }

  public presentActionSheet() {
  	this.takePicture(this.camera.PictureSourceType.CAMERA);
    /*let actionSheet = this.actionSheetCtrl.create({
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
    });*/
    /*actionSheet.present();*/
  }

  public takePicture(sourceType) {

	  // Create options for the Camera Dialog
	  var options = {
	    quality: 20,
	    sourceType: sourceType,
	    saveToPhotoAlbum: false,
	    correctOrientation: true
	  };
	 
	  // Get the data of an image
	  this.camera.getPicture(options).then((imagePath) => {
	    // Special handling for Android library
	 
	    var d = Date.now();
	    var date = new Date(d);
	    var month = date.getMonth()+1;
	    this.date_lastImage = ""+date.getFullYear()+"-"+month+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
	    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
	      this.filePath.resolveNativePath(imagePath)
	        .then(filePath => {
	        	

	        	
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

	public validateImage(){
		this.lastImage
		this.nativeStorage.getItem('images')
		  .then(
		    data => {
		    	let datas = data;
		    	 this.file.readAsDataURL(cordova.file.dataDirectory, this.lastImage).then(file =>{
		    	 	this
		    		datas.push({base64: file, name: this.lastImage, date_upload: this.date_lastImage,campagnes: this.campagnes, id_lieu: this.id_lieu  , upload: false, });
			    	this.nativeStorage.setItem("images", datas).then( data => {

			    		alert("Image validé!");
			    		this.navCtrl.push("WelcomePage");
			    	}); 
		    	}).catch(function (err: TypeError) {
                  alert(err.message);
              });
		    	
		    	
		    	
		    },
		    error => {
		    	this.file.readAsDataURL(cordova.file.dataDirectory, this.lastImage).then(file =>{
		    		
		    		this.nativeStorage.setItem('images', [{base64: file, name: this.lastImage, date_upload: this.date_lastImage,campagnes: this.campagnes, id_lieu: this.id_lieu  , upload: false, }] )
					  .then(
					    (data) =>{

					    	alert("Image validé!");
					    	this.navCtrl.push("WelcomePage");
					    } ,
					    error => console.error('Validating image : Error storing item', error)
					  );
		    	}).catch(function (err: TypeError) {
                  alert(err.message);
              });
			    	
		    }
		  );
		
	}

	public cancel(){
		this.navCtrl.push("WelcomePage");
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
