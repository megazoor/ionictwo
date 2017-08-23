import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from "@ionic/storage";


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    //public watch: any;
    profile: string;

    constructor(public navCtrl: NavController, public locationTrackerProvider: LocationTrackerProvider, public geolocation: Geolocation, private storage: Storage) {
         
        storage.ready().then(() => {
            storage.get('profile').then(profile => {
                console.log('got profile', profile);
                this.profile = profile;
            }).catch(console.log);
        });
    }
    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        console.log('loadMap hit');
        this.geolocation.getCurrentPosition().then((position) => {
            console.log('position', position.coords.latitude);
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        }, (err) => {
            console.log(err);
        });

    }
    //After that, we�re also creating some content and adding an info window that will be shown when the user 
    //taps on the marker. If you don�t want info windows, you can just remove those last two lines, but if you 
    //do want them, make sure to add the following function as well.
    addInfoWindow(marker, content) {

        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });

    }
    addMarker() {

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });

        let content = "<h4>Information!</h4>";

        //this.addInfoWindow(marker, content);

    }

    start() {
        this.locationTrackerProvider.startTracking();        


        if (this.locationTrackerProvider.lat != null) {
           // locationEnabled();
            console.log('locationEnabled here!');
            //add marker to new position
            let markerData = {
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: {
                    lat: this.locationTrackerProvider.lat,
                    lng: this.locationTrackerProvider.lng
                }
            };

            let marker = new google.maps.Marker(markerData);

            let content = "<h4>Information!</h4>"; 
        } else {
            //locationDisabled();
            console.log('locationDisabled');
        }

        //watch
    }
    stop() {
        this.locationTrackerProvider.stopTracking();
    }
    
}
