webpackJsonp([6],{

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScanPageModule", function() { return ScanPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scan__ = __webpack_require__(359);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ScanPageModule = /** @class */ (function () {
    function ScanPageModule() {
    }
    ScanPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__scan__["a" /* ScanPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__scan__["a" /* ScanPage */]),
            ],
        })
    ], ScanPageModule);
    return ScanPageModule;
}());

//# sourceMappingURL=scan.module.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_qr_scanner__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rezoom_rezoom__ = __webpack_require__(225);
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
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScanPage = /** @class */ (function () {
    function ScanPage(navCtrl, navParams, qrScanner, rezoom) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.qrScanner = qrScanner;
        this.rezoom = rezoom;
        this.data = {};
    }
    ScanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ScanPage');
    };
    ScanPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.qrScanner.prepare()
            .then(function (status) {
            if (status.authorized) {
                // camera permission was granted
                // start scanning
                var scanSub_1 = _this.qrScanner.scan().subscribe(function (text) {
                    /*alert('Scanned something '+ text);
        */
                    _this.qrScanner.hide(); // hide camera preview
                    scanSub_1.unsubscribe(); // stop scanning
                    try {
                        _this.data = JSON.parse(text);
                        if (typeof _this.data.id != undefined) {
                            _this.navCtrl.push('LieuDetailPage', { id_lieu: _this.data.id });
                        }
                        else {
                            alert("Error : " + _this.data);
                        }
                    }
                    catch (e) {
                        alert("QR Code non valide!");
                    }
                });
                _this.qrScanner.resumePreview();
                // show camera preview
                _this.qrScanner.show().then(function (data2) {
                    /*alert("datashowing: "+ data2.showing);*/
                });
                // wait for user to scan something, then the observable callback will be called
            }
            else if (status.denied) {
                alert('Denied');
                // camera permission was permanently denied
                // you must use QRScanner.openSettings() method to guide the user to the settings page
                // then they can grant the permission from there
            }
            else {
                /*alert('else')*/
                // permission was denied, but not permanently. You can ask for permission again at a later time.
            }
        }).catch(function (e) { alert('Error :' + e); _this.navCtrl.push('LieuDetailPage', { id_lieu: 616 }); });
    };
    ScanPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scan',template:/*ion-inline-start:"C:\Users\misa-pc\ionic_projects\rezoom-app\src\pages\scan\scan.html"*/'<!--\n\n  Generated template for the ScanPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>REZOOM > Scan Qr Code</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding style="background: none transparent;">\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\misa-pc\ionic_projects\rezoom-app\src\pages\scan\scan.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_qr_scanner__["a" /* QRScanner */], __WEBPACK_IMPORTED_MODULE_3__providers_rezoom_rezoom__["a" /* RezoomProvider */]])
    ], ScanPage);
    return ScanPage;
}());

//# sourceMappingURL=scan.js.map

/***/ })

});
//# sourceMappingURL=6.js.map