import { Component } from '@angular/core';
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

//declare var google;

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {

    //@ViewChild('map') mapElement: ElementRef;
   // map: any;

    public watch: any;
    public lat: number = 0;
    public lng: number = 0;

    //constructor(public zone: NgZone) {
    //    console.log('Hello LocationTrackerProvider Provider');
    //}
    constructor(private zone: NgZone, public backgroundGeolocation: BackgroundGeolocation, public geolocation: Geolocation) { }
       
    startTracking() {

        // Background Tracking

        let config = {
            desiredAccuracy: 0,
            stationaryRadius: 20,
            distanceFilter: 10,
            debug: true,
            interval: 2000
        };

        this.backgroundGeolocation.configure(config).subscribe((location) => {

            console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

            // Run update inside of Angular's zone
            this.zone.run(() => {
                this.lat = location.latitude;
                this.lng = location.longitude;               
                
            });

        }, (err) => {

            console.log(err);

        });

        // Turn ON the background-geolocation system.
        this.backgroundGeolocation.start();
        ////add marker to new position
        //let markerData = {
        //    map: document.getElementById('map'),
        //    animation: google.maps.Animation.DROP,
        //    position: {
        //        lat: this.lat,
        //        lng: this.lng
        //    }
        //};

        //let marker = new google.maps.Marker(markerData);
        //console.log('markerData', markerData);

        // Foreground Tracking

        let options = {
            frequency: 3000,
            enableHighAccuracy: true
        };

        this.watch = this.geolocation.watchPosition(options).subscribe((position: Geoposition) => {

            console.log(position);

            // Run update inside of Angular's zone
            this.zone.run(() => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;

                //add marker to new position
                //let markerData = {
                //    map: document.getElementById('map'),
                //    animation: google.maps.Animation.DROP,
                //    position: {
                //        lat: this.lat,
                //        lng: this.lng
                //    }
                 
                //};

                //let marker = new google.maps.Marker(markerData);

                //let content = "<h4>Information!</h4>";


                //this.addInfoWindow(marker, content);
                 //nfo window
            });

        });

    }
    stopTracking() {

        console.log('stopTracking');
        //add marker to new position
        //let markerData = {
        //    map: document.getElementById('map'),
        //    animation: google.maps.Animation.DROP,
        //    position: {
        //        lat: this.lat,
        //        lng: this.lng
        //    }

        //};

        //let marker = new google.maps.Marker(markerData);

        this.backgroundGeolocation.finish();
        this.backgroundGeolocation.stop();
        this.watch.unsubscribe();  
              

    }

}
