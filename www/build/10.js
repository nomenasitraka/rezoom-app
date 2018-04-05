webpackJsonp([10],{

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LieuDetailPageModule", function() { return LieuDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lieu_detail__ = __webpack_require__(353);
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

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LieuDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rezoom_rezoom__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(224);
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
    function LieuDetailPage(navCtrl, navParams, rezoom, camera, transfer, file, filePath, actionSheetCtrl, toastCtrl, platform, loadingCtrl) {
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
        this.lieu = {};
        this.campagnes = [];
        this.lastImage = null;
        this.logged = false;
        this.user = {};
        this.id_lieu = this.navParams.get('id_lieu');
    }
    LieuDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var d = Date.now();
        var date = new Date(d);
        var month = date.getMonth() + 1;
        this.date_now = "" + date.getFullYear() + "-" + month + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        this.rezoom.getLieu(this.id_lieu).subscribe(function (datas) {
            console.log(datas);
            _this.lieu = datas.lieu;
            _this.campagnes = datas.campagnes;
        });
        console.log('ionViewDidLoad LieuDetailPage');
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
            }
            else {
                alert("Erreur d'authentification");
            }
        });
    };
    LieuDetailPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: "Choisir l'image source",
            buttons: [
                {
                    text: "Charger depuis l'album",
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Utiliser la caméra',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Annuler',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    LieuDetailPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        alert(sourceType);
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var d = Date.now();
                    var date = new Date(d);
                    var month = date.getMonth() + 1;
                    _this.date_lastImage = "" + date.getFullYear() + "-" + month + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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
            selector: 'page-lieu-detail',template:/*ion-inline-start:"C:\Users\misa-pc\ionic_projects\rezoom-app\src\pages\lieu-detail\lieu-detail.html"*/'<!--\n\n  Generated template for the LieuDetailPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header text-wrap>\n\n\n\n  <ion-navbar text-wrap>\n\n    <ion-title text-wrap>REZOOM > {{ user.first_name }} {{ user.last_name }}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n	 	<div>\n\n	 		<p class="bold">CE FLASH CODE CORRESPOND AU LIEU SUIVANT : </p>\n\n	 		<p>{{ lieu.nom_lieux }}</p>\n\n	 	</div >\n\n	 	<div class="hr"> </div>\n\n	 	<div>\n\n	 		<p><span class="bold">NOUS SOMME EN SEMAINE :</span>  5</p>\n\n	 		<p><span class="bold">IL EST :</span>  {{ date_now }}</p>\n\n	 	\n\n	 	</div>\n\n\n\n	 	<div class="hr"> </div>\n\n	 	<div>\n\n	 		<p class="bold">CETTE SEMAINE, VOUS DEVRIEZ TROUVER SUR CE PRESENTOIRE : </p>\n\n	 		<ul>\n\n	 			<li *ngFor="let campagne of campagnes">\n\n	 				{{ campagne.nom_campagne }} <span *ngIf="logged">: {{ campagne.nb_casier }} CASIER(S) / {{ campagne.repartition }}</span>\n\n	 			</li>\n\n	 		</ul>\n\n	 		\n\n	 	</div>\n\n	 	 <div class="hr"> </div>\n\n\n\n	 	<div *ngIf="!logged">\n\n	 		<button ion-button block >\n\n            \n\n              DECOUVREZ REZOOM\n\n      		</button>\n\n\n\n      		<button ion-button block >\n\n            \n\n              NOUS CONTACTER\n\n      		</button>\n\n	 	</div>\n\n\n\n	 	<div *ngIf="logged">\n\n	 		<p text-center>DEPOSEZ LES DOCUMENTS SUR LE PRESENTOIR PUIS</p>\n\n	 		<button ion-button block icon-left (click)="presentActionSheet()">\n\n	 			<ion-icon name="camera"></ion-icon>\n\n            	PRENEZ PHOTO\n\n      		</button>	\n\n\n\n      			<p text-center>ENSUITE</p>\n\n\n\n      		<button [disabled]="lastImage === null" ion-button block icon-left (click)="uploadImage()">\n\n	 			<ion-icon name="camera"></ion-icon>\n\n            	ENVOYEZ\n\n      		</button>\n\n\n\n\n\n	 	</div>\n\n\n\n\n\n\n\n	 	<div class="hr"> </div>\n\n\n\n	 	\n\n	 	<div *ngIf="!logged">\n\n	 		<p text-center>ESPACE PRO</p>\n\n	 		<form padding (ngSubmit)="login()">\n\n		      <ion-item>\n\n		        <ion-label class="label">IDENTIFIANT</ion-label>\n\n		        <ion-input [(ngModel)]="identity" type="text" name="title" placeholder="Identifiant"></ion-input>\n\n		      </ion-item>\n\n		      <ion-item>\n\n		        <ion-label class="label">MOT DE PASSE</ion-label>\n\n		        <ion-input [(ngModel)]="password" type="password" name="description" placeholder="Mot de passe"></ion-input>\n\n		      </ion-item>\n\n		      <button ion-button type="submit" block>IDENTIFICATION</button>\n\n		    </form>\n\n\n\n		    <div class="hr"> </div>\n\n	 		\n\n	 	</div>\n\n	 	\n\n\n\n		<div *ngIf="logged">\n\n	 		\n\n	 		 <img src="{{pathForImage(lastImage)}}" style="width: 100%" [hidden]="lastImage === null">\n\n  			<h3 [hidden]="lastImage !== null" text-center>Choisissez des photos!</h3>\n\n		</div>\n\n	 \n\n</ion-content>\n\n\n\n\n\n<!-- \n\n<ion-footer *ngIf="logged">\n\n  <ion-toolbar color="primary">\n\n    <ion-buttons>\n\n      <button ion-button icon-left (click)="presentActionSheet()">\n\n        <ion-icon name="camera"></ion-icon>Select Image\n\n      </button>\n\n      <button ion-button icon-left (click)="uploadImage()" [disabled]="lastImage === null">\n\n        <ion-icon name="cloud-upload"></ion-icon>Upload\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-footer> -->\n\n'/*ion-inline-end:"C:\Users\misa-pc\ionic_projects\rezoom-app\src\pages\lieu-detail\lieu-detail.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_rezoom_rezoom__["a" /* RezoomProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_rezoom_rezoom__["a" /* RezoomProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__["a" /* Transfer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__["a" /* Transfer */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__["a" /* FilePath */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__["a" /* FilePath */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _l || Object])
    ], LieuDetailPage);
    return LieuDetailPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=lieu-detail.js.map

/***/ })

});
//# sourceMappingURL=10.js.map