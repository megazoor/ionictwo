import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { JwtHelper} from "angular2-jwt";
import { Storage } from "@ionic/storage";
import { ToastController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

import {AuthService} from "../../app/services/auth/auth";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    private LOGIN_URL = "http://localhost:37814/token";
    private SIGNUP_URL = "http://localhost:37814/Account/Register";

    auth: AuthService;

    // When the page loads, we want the Login segment to be selected
    authType: string = "login";

    // We need to set the content type for the server
    contentHeader = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
    error: string;
    jwtHelper = new JwtHelper();
    user: string;


    constructor(private http: Http, public storage: Storage, public toastCtrl: ToastController, public navCtrl: NavController) {
        this.auth = AuthService;

        storage.ready().then(() => {
            storage.get('profile').then(profile => {
               // this.user = JSON.parse(profile);
            }).catch(console.log);
        });
    }

    

    authenticate(credentials) {
        this.authType == 'login' ? this.login(credentials) : this.signup(credentials); 
        console.log('authed yay');

    } 
  
    login(credentials) {
        this.http.post(this.LOGIN_URL, "grant_type=password&username=" + credentials.username + "&password=" + credentials.password, { headers: this.contentHeader })
            .map(res => res.json()) 
            .do(a => console.log(a))                 
            .subscribe(
            data => this.authSuccess(data.access_token, credentials),
            err => this.err(err, credentials)
        );

    }
    signup(credentials) {
        this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
            .map(res => res.json())
            .subscribe(
            data => this.authSuccess(data.access_token, credentials),
            err => this.error = err
            );
    }

    err(error, credentials) {
        console.log('woops got an error!', error);
        let toast = this.toastCtrl.create({
            message: 'Hey,  ' + credentials.username + '  thats not your password!',
            duration: 3000
        });
        toast.present();
    }

    logout() {
        this.storage.remove('token');
        this.user = null;
    }


    authSuccess(token, credentials) {
        this.error = null;        
        this.storage.ready().then(() => {
            this.storage.set('token', token);
            console.log('storage ready', token);
            //console.log('local storage', Object.keys(this.storage));            
        });
        let toast = this.toastCtrl.create({
            message: 'Hey,  ' + credentials.username + '  logged in yay!',
            duration: 3000
        });
        toast.present();
        console.log('got creds', credentials);
        console.log('got token!', token);
        this.user = credentials.username;
        this.storage.set('profile', this.user);        
        console.log('access token granted', this.user);
        this.navCtrl.setRoot(HomePage);
    } 
}

