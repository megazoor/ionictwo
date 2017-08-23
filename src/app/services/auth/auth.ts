// app/services/auth/auth.ts
//import { Storage } from "@ionic/storage";
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
    export class AuthService {

        constructor() {            
        }


    public static authenticated() {
        return tokenNotExpired('/_ionickv/token');

    }
    //getAuth() {
    //    this.storage.get('token')
    //        .then(a => console.log('YESSS!', a))
    //        .then((value) => {
    //            return true;
    //        });
    //}
}