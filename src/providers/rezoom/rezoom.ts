import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import {Observable} from 'rxjs/Observable'; 

declare var cordova: any;
/*
  Generated class for the RezoomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RezoomProvider {

	site_url = "http://www.rezoom.sopromer.com";

	httpOptions = {
	  headers: new HttpHeaders({
	    'Content-Type':  'application/form-data',
	  })
	};

  constructor(public http: HttpClient) {
    console.log('Hello RezoomProvider Provider');
  }

  getLieu(id){
  	const body = new HttpParams()
    .set('id_lieu', id);
  	return this.http.post(this.site_url+"/mobile/qr_lieu/",
	    body.toString(),
	    {
	      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
	    }
  	);
  }

  public login(identity, password){

  	const body = new HttpParams()
    .set('identity', identity)
    .set('password', password);
  	return this.http.post(this.site_url+"/mobile/login/",
	    body.toString(),
	    {
	      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
	    }
  	);
  }

  public sendImage(image){
        //window.open(base64Image);
    const fd = new FormData();

    fd.append('id_campagne', image.id_campagne);
            fd.append('date_upload', image.date_upload);
            fd.append('id_lieu', image.id_lieu);
            let b = new Blob([window.atob(image.base64)], {type: 'image/gif'});
            let file = new File([b],image.name );
            fd.append('photo',file);
/*
            fd.append('photo_name', image.name);      */   
           
          /*  const body = new HttpParams()
            .set('id_campagne', image.id_campagne)
            .set('date_upload', image.date_upload)
            .set('id_lieu', image.id_lieu)
            .set('photo', image.base64Image)
            .set('photo_name', image.name)*/
            

            let headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data')
          return this.http.post(this.site_url+"/mobile/photo/",
              fd,
              {
                headers: headers
              }
            );
       
      
        // Then you'll be able to handle the myimage.png file as base64
    
        
        
     
  }

  public sendImageBase64(image){
        //window.open(base64Image);
    const fd = new FormData();

    fd.append('id_campagne', image.id_campagne);
            fd.append('date_upload', image.date_upload);
            fd.append('id_lieu', image.id_lieu);
           
            fd.append('photo',image.base64);

            fd.append('photo_name', image.name);         
           
          /*  const body = new HttpParams()
            .set('id_campagne', image.id_campagne)
            .set('date_upload', image.date_upload)
            .set('id_lieu', image.id_lieu)
            .set('photo', image.base64Image)
            .set('photo_name', image.name)*/
            

            let headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data')
          return this.http.post(this.site_url+"/mobile/photobase64/",
              fd,
              {
                headers: headers
              }
            )
       
      
        // Then you'll be able to handle the myimage.png file as base64
    
        
        
     
  }

   public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  


}
