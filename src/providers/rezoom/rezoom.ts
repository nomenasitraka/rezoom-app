import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import {Observable} from 'rxjs/Observable'; 

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
	    'Content-Type':  'aapplication/form-da',
	  })
	};

  constructor(public http: HttpClient) {
    console.log('Hello RezoomProvider Provider');
  }

  getLieu(id): Observable<[]>{
  	const body = new HttpParams()
    .set('id_lieu', id);
  	return this.http.post(this.site_url+"/mobile/qr_lieu/",
	    body.toString(),
	    {
	      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
	    }
  	);
  }

}
