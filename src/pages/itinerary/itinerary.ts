// pages/quotes/quotes.ts
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../app/services/auth/auth";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-itinerary',
    templateUrl: 'itinerary.html',
})
export class ItineraryPage {
    API: string = "http://localhost:37814/api/v1/jobs";
    code: string;
    status: string;
    brand: string;
    error: string;
    auth: AuthService;
      
    constructor(private http: Http, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
       // this.auth = AuthService;
    }

    //getQuote() {
    //    // Use a regular Http call to access unsecured routes
    //    this.http.get(`${this.API}/random-quote`)
    //        .map(res => res.text())
    //        .subscribe(
    //        data => this.quote = data,
    //        err => this.error = err
    //        );
    //}
    ionViewDidLoad() {
        console.log('ionViewDidLoad ItineraryPage');
    }

    getItinereary() {
        // Use authHttp to access secured routes
        this.storage.get('token').then((token) => {
            let headers = new Headers();
            headers.append('Authorization', 'Bearer ' + token);

            this.http.get(`${this.API}/protected/random-quote`, {
                headers: headers })
                .do(a => console.log(a))
                .map(res => res.text())
                .subscribe(
                data => this.code = data,
                err => this.error = err
                );
        })
    }
}