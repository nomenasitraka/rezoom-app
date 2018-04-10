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
        // watch network for a connection
        var connectSubscription = this.network.onConnect().subscribe(function () {
            console.log('network connected!');
            // We just got a connection but we need to wait briefly
            // before we determine the connection type. Might need to wait.
            // prior to doing any api requests as well.
            _this.rezoom.importDatas().subscribe(function (datas) {
                _this.loading.dismissAll();
                console.log(datas);
                _this.nativeStorage.setItem("lieux", datas).then(function (d) {
                    alert("Données importées avec succès!");
                });
            });
        });
        // stop connect watch
        connectSubscription.unsubscribe();
        var disconnectSubscription = this.network.onDisconnect().subscribe(function () {
            _this.loading.dismissAll();
            alert("Vous n'êtes pas connecté. Conectez-vous à un réseau wifi!");
        });
        // stop disconnect watch
        disconnectSubscription.unsubscribe();
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"/home/misa/ionic_projects/rezoom-app/src/pages/welcome/welcome.html"*/'\n<ion-header>\n\n  <ion-navbar>\n  \n\n    <ion-title>REZOOM</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content scroll="false" *ngIf="!scanning" >\n  <!-- <div class="splash-bg"></div> -->\n \n    <div padding>\n      \n      <button ion-button icon-left block (click)="scan()">\n            <ion-icon name="camera"></ion-icon> <br>\n              SCAN QR CODE\n      </button>\n\n      <button ion-button icon-left block (click)="importDatas()">\n            <ion-icon name="arrow-down"></ion-icon>\n              Synchroniser les données\n      </button>\n\n      <div class="hr"></div>\n\n      <button ion-button icon-left block (click)="upload()">\n            <ion-icon name="arrow-down"></ion-icon>\n              Uploader les images\n      </button>\n\n      <button ion-button icon-left block *ngIf="!logged" (click)="login()">\n            <ion-icon name="arrow-down"></ion-icon>\n              Connexion\n      </button>\n\n      <button ion-button icon-left block *ngIf="logged" (click)="logout()" >\n            <ion-icon name="arrow-down"></ion-icon>\n              Déconexion\n      </button>\n\n    \n\n      <ul>\n        <li *ngFor="let image of images">{{ image.name }}</li>\n      </ul>\n    </div>\n      \n\n   \n    \n    <!-- <button ion-button block (click)="login()" class="login">{{ \'LOGIN\' | translate }}</button> -->\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/misa/ionic_projects/rezoom-app/src/pages/welcome/welcome.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__providers_rezoom_rezoom__["a" /* RezoomProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_rezoom_rezoom__["a" /* RezoomProvider */]) === "function" && _e || Object])
    ], WelcomePage);
    return WelcomePage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=welcome.js.map

/***/ })

});
//# sourceMappingURL=0.js.map