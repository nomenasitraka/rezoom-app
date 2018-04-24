webpackJsonp([0],{

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomePageModule", function() { return WelcomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__welcome__ = __webpack_require__(371);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var WelcomePageModule = /** @class */ (function () {
    function WelcomePageModule() {
    }
    WelcomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */]
            ]
        })
    ], WelcomePageModule);
    return WelcomePageModule;
}());

//# sourceMappingURL=welcome.module.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rezoom_rezoom__ = __webpack_require__(223);
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
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, nativeStorage, loadingCtrl, network, rezoom) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.network = network;
        this.rezoom = rezoom;
        this.logged = false;
        this.scanning = false;
        this.nativeStorage.getItem("user").then(function (user) {
            _this.logged = true;
        }, function (error) {
            _this.logged = false;
        });
    }
    WelcomePage.prototype.scan = function () {
        this.navCtrl.push('ScanPage');
    };
    WelcomePage.prototype.login = function () {
        this.navCtrl.push('LoginPage');
    };
    WelcomePage.prototype.signup = function () {
        this.navCtrl.push('SignupPage');
    };
    WelcomePage.prototype.upload = function () {
        this.navCtrl.push('UploadPage');
    };
    WelcomePage.prototype.logout = function () {
        var _this = this;
        this.nativeStorage.remove("user").then(function (data) {
            _this.logged = false;
        });
    };
    WelcomePage.prototype.importDatas = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Importation des données...',
        });
        this.loading.present();
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WIFI';
        states[Connection.CELL_2G] = '2G';
        states[Connection.CELL_3G] = '3G';
        states[Connection.CELL_4G] = '4G';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';
        if (states[networkState] == "WIFI" || states[networkState] == "4G") {
            this.loading.dismissAll();
            this.rezoom.importDatas().subscribe(function (datas) {
                _this.loading.dismissAll();
                console.log(datas);
                _this.nativeStorage.setItem("lieux", { "date": datas }).then(function (d) {
                    alert("Données importées avec succès!");
                });
            });
        }
        else {
            this.loading.dismissAll();
            alert("Vous n'êtes pas connecté. Conectez-vous à un réseau wifi!");
        }
        // watch network for a connection
        // let connectSubscription = this.network.onConnect().subscribe(() => {
        //   console.log('network connected!');
        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        // this.rezoom.importDatas().subscribe(datas => {
        //     this.loading.dismissAll();
        //     console.log(datas);
        //     this.nativeStorage.setItem("lieux", datas).then(d => {
        //       alert("Données importées avec succès!");
        //     });
        //   });
        // });
        // stop connect watch
        // connectSubscription.unsubscribe();
        // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        //   this.loading.dismissAll();
        //    alert("Vous n'êtes pas connecté. Conectez-vous à un réseau wifi!");
        // });
        // stop disconnect watch
        // disconnectSubscription.unsubscribe();
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"/home/misa/ionic_projects/rezoom-app/src/pages/welcome/welcome.html"*/'\n<ion-header>\n\n  <ion-navbar>\n  \n\n    <ion-title>REZOOM</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content scroll="false" *ngIf="!scanning" >\n  <!-- <div class="splash-bg"></div> -->\n    <div text-center>\n        <ion-img width="200" src="assets/img/logo.jpg"></ion-img>\n \n    </div>\n    \n    <div padding>\n\n      \n      <button ion-button icon-left block (click)="scan()" id="scan">\n            <ion-icon name="camera"></ion-icon> <br>\n            <b>SCAN QR CODE</b>  \n      </button>\n\n      <button ion-button icon-left block (click)="upload()" id="upload">\n            <ion-icon name="arrow-down"></ion-icon>\n            <b>UPLOADER LES IMAGES</b>  \n      </button>\n\n      <div class="hr"></div>\n      <div text-center *ngIf="date_datas">\n        VOUS SUIVEZ LE PLANNING TELECHARGE\n      </div>\n      <div text-center *ngIf="date_datas">\n        le {{ date_datas }}\n      </div>\n      <button ion-button icon-left block (click)="importDatas()">\n            <ion-icon name="arrow-down"></ion-icon>\n              SYNCHRONYSER LES DONNES\n      </button>\n      <div class="hr"></div>\n\n      \n\n      \n      <button ion-button icon-left block *ngIf="!logged" (click)="login()">\n            <ion-icon name="arrow-down"></ion-icon>\n              CONNEXION\n      </button>\n\n      <button ion-button icon-left block *ngIf="logged" (click)="logout()" >\n            <ion-icon name="arrow-down"></ion-icon>\n              DECONNEXION\n      </button>\n\n    \n\n      <ul>\n        <li *ngFor="let image of images">{{ image.name }}</li>\n      </ul>\n    </div>\n      \n\n   \n    \n    <!-- <button ion-button block (click)="login()" class="login">{{ \'LOGIN\' | translate }}</button> -->\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/misa/ionic_projects/rezoom-app/src/pages/welcome/welcome.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rezoom_rezoom__["a" /* RezoomProvider */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ })

});
//# sourceMappingURL=0.js.map