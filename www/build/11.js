webpackJsonp([11],{

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LieuDetailPageModule", function() { return LieuDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lieu_detail__ = __webpack_require__(360);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LieuDetailPageModule = /** @class */ (function () {
    function LieuDetailPageModule() {
    }
    LieuDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__lieu_detail__["a" /* LieuDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__lieu_detail__["a" /* LieuDetailPage */]),
            ],
        })
    ], LieuDetailPageModule);
    return LieuDetailPageModule;
}());

//# sourceMappingURL=lieu-detail.module.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LieuDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rezoom_rezoom__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_email_composer__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the LieuDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LieuDetailPage = /** @class */ (function () {
    function LieuDetailPage(navCtrl, navParams, rezoom, camera, transfer, file, filePath, actionSheetCtrl, toastCtrl, platform, loadingCtrl, nativeStorage, emailComposer, network) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rezoom = rezoom;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.nativeStorage = nativeStorage;
        this.emailComposer = emailComposer;
        this.network = network;
        this.lieu = {};
        this.campagnes = [];
        this.lastImage = null;
        this.logged = false;
        this.user = {};
        this.id_lieu = this.navParams.get('id_lieu');
        this.nativeStorage.getItem("user").then(function (data) {
            _this.user = data;
            _this.logged = true;
        }, function (error) {
        });
    }
    LieuDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var d = Date.now();
        var date = new Date(d);
        var month = date.getMonth() + 1;
        this.date_now = "" + date.getFullYear() + "-" + month + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        // watch network for a disconnect
        // var networkState = navigator.connection.type;
        //  var states = {};
        //  states[Connection.UNKNOWN]  = 'Unknown connection';
        //  states[Connection.ETHERNET] = 'Ethernet connection';
        //  states[Connection.WIFI]     = 'WIFI';
        //  states[Connection.CELL_2G]  = '2G';
        //  states[Connection.CELL_3G]  = '3G';
        //  states[Connection.CELL_4G]  = '4G';
        //  states[Connection.CELL]     = 'Cell generic connection';
        //  states[Connection.NONE]     = 'No network connection';
        if (!navigator.onLine) {
            alert("not online");
            this.nativeStorage.getItem("lieux").then(function (lieux) {
                _this.lieu_str_all = JSON.stringify(lieux);
                alert("id lieu :" + _this.id_lieu);
                var lieu = lieux.value.filter(function (elt) { return elt.lieu.id_lieux_rezoom == _this.id_lieu; });
                alert(lieu.nom_lieux);
                _this.lieu = lieu.lieu;
                _this.campagnes = lieu.campagnes;
                _this.lieu_str = lieu;
            }, function (error) {
                alert("Vos données locales ne sont pas à jour, veuillez les mettre à jour en vous connectant sur wifi.");
                _this.navCtrl.push("WelcomePage");
            });
        }
        ;
        // watch network for a connection
        if (navigator.onLine) {
            console.log('network connected!');
            // We just got a connection but we need to wait briefly
            // before we determine the connection type. Might need to wait.
            // prior to doing any api requests as well.
            this.rezoom.getLieu(this.id_lieu).subscribe(function (datas) {
                _this.lieu = datas.lieu;
                _this.campagnes = datas.campagnes;
            });
        }
        ;
    };
    LieuDetailPage.prototype.login = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Identification...',
        });
        this.loading.present();
        this.rezoom.login(this.identity, this.password).subscribe(function (datas) {
            _this.loading.dismissAll();
            console.log(datas);
            if (datas.status == "ok") {
                _this.logged = true;
                _this.user = datas.user;
                _this.nativeStorage.setItem("user", datas.user).then(function (data) { });
            }
            else {
                alert("Erreur d'authentification");
            }
        });
    };
    LieuDetailPage.prototype.signaler = function () {
        var _this = this;
        this.emailComposer.requestPermission().then(function (permission) {
            if (permission) {
                var d = new Date;
                var date_now = d.toString();
                /*let date_now= ""+date.getDate()+"-"+month+"-"+date.getFullYear()+" / "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();*/
                var email = {
                    to: 'contact@rezoom.re',
                    subject: "" + date_now + " / " + _this.lieu.nom_lieux,
                    isHtml: true
                };
                _this.emailComposer.open(email);
            }
        });
    };
    LieuDetailPage.prototype.presentActionSheet = function () {
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
    };
    LieuDetailPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 20,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            var d = Date.now();
            var date = new Date(d);
            var month = date.getMonth() + 1;
            _this.date_lastImage = "" + date.getFullYear() + "-" + month + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.' + err);
        });
    };
    LieuDetailPage.prototype.validateImage = function () {
        var _this = this;
        this.lastImage;
        this.nativeStorage.getItem('images')
            .then(function (data) {
            var datas = data;
            _this.file.readAsDataURL(cordova.file.dataDirectory, _this.lastImage).then(function (file) {
                _this;
                datas.push({ base64: file, name: _this.lastImage, date_upload: _this.date_lastImage, campagnes: _this.campagnes, id_lieu: _this.id_lieu, upload: false, });
                _this.nativeStorage.setItem("images", datas).then(function (data) {
                    alert("Image validé!");
                    _this.navCtrl.push("WelcomePage");
                });
            }).catch(function (err) {
                alert(err.message);
            });
        }, function (error) {
            _this.file.readAsDataURL(cordova.file.dataDirectory, _this.lastImage).then(function (file) {
                _this.nativeStorage.setItem('images', [{ base64: file, name: _this.lastImage, date_upload: _this.date_lastImage, campagnes: _this.campagnes, id_lieu: _this.id_lieu, upload: false, }])
                    .then(function (data) {
                    alert("Image validé!");
                    _this.navCtrl.push("WelcomePage");
                }, function (error) { return console.error('Validating image : Error storing item', error); });
            }).catch(function (err) {
                alert(err.message);
            });
        });
    };
    LieuDetailPage.prototype.cancel = function () {
        this.navCtrl.push("WelcomePage");
    };
    // Create a new name for the image
    LieuDetailPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    LieuDetailPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    LieuDetailPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    LieuDetailPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    LieuDetailPage.prototype.uploadImage = function () {
        var _this = this;
        // Destination URL
        var url = "http://www.rezoom.sopromer.com/mobile/photo";
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        alert("UPLOADING");
        alert(targetPath);
        // File name only
        var filename = this.lastImage;
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename }
        };
        var fileTransfer = this.transfer.create();
        var reader = new FileReader();
        reader.readAsDataURL(filename);
        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            _this.loading.dismissAll();
            _this.presentToast('Image succesful uploaded.');
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast('Error while uploading file. : ' + err);
        });
    };
    LieuDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-lieu-detail',template:/*ion-inline-start:"/home/misa/ionic_projects/rezoom-app/src/pages/lieu-detail/lieu-detail.html"*/'<!--\n  Generated template for the LieuDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header text-wrap>\n\n  <ion-navbar text-wrap>\n    <ion-title text-wrap>REZOOM > {{ user.first_name }} {{ user.last_name }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n		<p>{{ base64 }}</p>\n	 	<div>\n	 		<p class="bold">CE FLASH CODE CORRESPOND AU LIEU SUIVANT : </p>\n	 		<p>{{ lieu.nom_lieux }}</p>\n	 	</div >\n	 	<div class="hr"> </div>\n	 	<div>\n	 		<p><span class="bold">NOUS SOMME EN SEMAINE :</span>  5</p>\n	 		<p><span class="bold">IL EST :</span>  {{ date_now }}</p>\n	 	\n	 	</div>\n\n	 	<div class="hr"> </div>\n	 	<div>\n	 		<p class="bold">CETTE SEMAINE, VOUS DEVRIEZ TROUVER SUR CE PRESENTOIRE : </p>\n	 		<ul>\n	 			<li *ngFor="let campagne of campagnes">\n	 				{{ campagne.nom_campagne }} <span *ngIf="logged">: {{ campagne.nb_casier }} CASIER(S) / {{ campagne.repartition }}</span>\n	 			</li>\n	 		</ul>\n	 		\n	 	</div>\n	 	 <div class="hr"> </div>\n\n	 	<div *ngIf="!logged">\n	 		<button ion-button block >\n            \n              DECOUVREZ REZOOM\n      		</button>\n\n      		<button ion-button block >\n            \n              NOUS CONTACTER\n      		</button>\n	 	</div>\n\n	 	<div *ngIf="logged">\n	 		<p text-center>DEPOSEZ LES DOCUMENTS SUR LE PRESENTOIR PUIS</p>\n	 		<button ion-button block icon-left (click)="presentActionSheet()" [hidden]="lastImage !== null">\n	 			<ion-icon name="camera"></ion-icon>\n            	PRENEZ PHOTO\n      		</button>	\n\n      			<p text-center>ENSUITE</p>\n\n      		\n      		<button [disabled]="lastImage === null" ion-button block icon-left (click)="validateImage()">\n	 			<ion-icon name="camera"></ion-icon>\n            	VALIDER LA PHOTO\n      		</button>\n      		<br>\n      		<br>\n      		<p text-center [hidden]="lastImage !== null" >ENVOYEZ UN MAIL POUR SIGNALER UN PROBLEME SUR CE PRESENTOIRE</p>\n\n      		<button ion-button block [hidden]="lastImage !== null" (click)="signaler()">\n	 			\n            	SIGNALER\n      		</button>\n\n\n      		\n\n\n	 	</div>\n\n\n\n	 	<div class="hr"> </div>\n\n	 	\n	 	<div *ngIf="!logged">\n	 		<p text-center>ESPACE PRO</p>\n	 		<form padding (ngSubmit)="login()">\n		      <ion-item>\n		        <ion-label class="label">IDENTIFIANT</ion-label>\n		        <ion-input [(ngModel)]="identity" type="text" name="title" placeholder="Identifiant"></ion-input>\n		      </ion-item>\n		      <ion-item>\n		        <ion-label class="label">MOT DE PASSE</ion-label>\n		        <ion-input [(ngModel)]="password" type="password" name="description" placeholder="Mot de passe"></ion-input>\n		      </ion-item>\n		      <button ion-button type="submit" block>IDENTIFICATION</button>\n		    </form>\n\n		    <div class="hr"> </div>\n	 		\n	 	</div>\n\n	 	<div>\n      			{{ lieu_str }}\n      		</div>\n      		<div>\n      			{{ lieu_str_all }}\n      		</div>\n<div>\n      			{{ lieu_str }}\n      		</div>\n      		<div>\n      			{{ lieu_str_all }}\n      		</div>\n\n	 	\n\n		<div *ngIf="logged">\n	 		\n	 		 <img src="{{pathForImage(lastImage)}}" style="width: 100%" [hidden]="lastImage === null">\n  			\n		</div>\n\n		<button [hidden]="lastImage === null" ion-button block icon-left (click)="cancel()">\n	 			\n            	ANNULER\n      	</button>\n	 \n</ion-content>\n\n\n<!-- \n<ion-footer *ngIf="logged">\n  <ion-toolbar color="primary">\n    <ion-buttons>\n      <button ion-button icon-left (click)="presentActionSheet()">\n        <ion-icon name="camera"></ion-icon>Select Image\n      </button>\n      <button ion-button icon-left (click)="uploadImage()" [disabled]="lastImage === null">\n        <ion-icon name="cloud-upload"></ion-icon>Upload\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer> -->\n'/*ion-inline-end:"/home/misa/ionic_projects/rezoom-app/src/pages/lieu-detail/lieu-detail.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_rezoom_rezoom__["a" /* RezoomProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_rezoom_rezoom__["a" /* RezoomProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__["a" /* Transfer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__["a" /* Transfer */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__["a" /* FilePath */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__["a" /* FilePath */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__["a" /* NativeStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__["a" /* NativeStorage */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_native_email_composer__["a" /* EmailComposer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_native_email_composer__["a" /* EmailComposer */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__["a" /* Network */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__["a" /* Network */]) === "function" && _p || Object])
    ], LieuDetailPage);
    return LieuDetailPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
}());

//# sourceMappingURL=lieu-detail.js.map

/***/ })

});
//# sourceMappingURL=11.js.map