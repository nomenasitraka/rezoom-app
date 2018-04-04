webpackJsonp([10],{

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LieuDetailPageModule", function() { return LieuDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lieu_detail__ = __webpack_require__(351);
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__lieu_detail__["a" /* LieuDetailPage */]),
            ],
        })
    ], LieuDetailPageModule);
    return LieuDetailPageModule;
}());

//# sourceMappingURL=lieu-detail.module.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LieuDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rezoom_rezoom__ = __webpack_require__(224);
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
    function LieuDetailPage(navCtrl, navParams, rezoom) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rezoom = rezoom;
        this.lieu = {};
        this.campagnes = [];
        this.id_lieu = this.navParams.get('id_lieu');
    }
    LieuDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.rezoom.getLieu(this.id_lieu).subscribe(function (datas) {
            console.log(datas);
            alert(datas);
            _this.lieu = datas.lieu;
            _this.campagnes = datas.campagnes;
        });
        console.log('ionViewDidLoad LieuDetailPage');
    };
    LieuDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-lieu-detail',template:/*ion-inline-start:"C:\Users\sitraka\ionic_project\rezoom\src\pages\lieu-detail\lieu-detail.html"*/'<!--\n  Generated template for the LieuDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>REZOOM</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	 	<div>\n	 		<p class="bold">CE FLASH CODE CORRESPOND AU LIEU SUIVANT : </p>\n	 		<p>{{ lieu.nom_lieux }}</p>\n	 	</div >\n	 	<div class="hr"> </div>\n	 	<div>\n	 		<p><span class="bold">NOUS SOMME EN SEMAINE :</span>  5</p>\n	 		<p><span class="bold">IL EST :</span>  07/02/2013 - 10h20</p>\n	 	\n	 	</div>\n\n	 	<div class="hr"> </div>\n	 	<div>\n	 		<p class="bold">CETTE SEMAINE, VOUS DEVRIEZ TROUVER SUR CE PRESENTOIRE : </p>\n	 		<ul>\n	 			<li *ngFor="let campagne of campagnes">\n	 				{{ campagne.nom_campagne }}\n	 			</li>\n	 		</ul>\n	 		\n	 	</div>\n	 	 <div class="hr"> </div>\n\n	 	<div>\n	 		<button ion-button block >\n            \n              DECOUVREZ REZOOM\n      		</button>\n\n      		<button ion-button block >\n            \n              NOUS CONTACTER\n      		</button>\n	 	</div>\n\n	 	<div class="hr"> </div>\n\n	 	<p text-center>ESPACE PRO</p>\n	 		<form padding>\n		      <ion-item>\n		        <ion-label class="label">IDENTIFIANT</ion-label>\n		        <ion-input type="text" name="title" placeholder="Identifiant"></ion-input>\n		      </ion-item>\n		      <ion-item>\n		        <ion-label class="label">MOT DE PASSE</ion-label>\n		        <ion-input type="password" name="description" placeholder="Mot de passe"></ion-input>\n		      </ion-item>\n		      <button ion-button type="submit" block>IDENTIFICATION</button>\n		    </form>\n	 \n</ion-content>\n'/*ion-inline-end:"C:\Users\sitraka\ionic_project\rezoom\src\pages\lieu-detail\lieu-detail.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_rezoom_rezoom__["a" /* RezoomProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_rezoom_rezoom__["a" /* RezoomProvider */]) === "function" && _c || Object])
    ], LieuDetailPage);
    return LieuDetailPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=lieu-detail.js.map

/***/ })

});
//# sourceMappingURL=10.js.map