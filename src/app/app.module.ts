import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from "@ionic/storage";
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';


//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CalendarPage } from '../pages/calendar/calendar';
import { ItineraryPage } from '../pages/itinerary/itinerary';
import { ReceiptsPage } from '../pages/receipts/receipts';
import { TasksPage } from '../pages/tasks/tasks';
import { TaskstepsPage } from '../pages/tasksteps/tasksteps';
import { TimecardPage } from '../pages/timecard/timecard';
import { ProfilePage } from '../pages/profile/profile';

//services
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthService } from "../app/services/auth/auth";

//import { AuthServiceProvider } from '../providers/auth-service/auth-service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        CalendarPage,
        ItineraryPage,
        ReceiptsPage,
        TasksPage,
        TaskstepsPage,
        TimecardPage,
        ProfilePage
    ],
    imports: [
        BrowserModule,
        HttpModule,        
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        CalendarPage,
        ItineraryPage,
        ReceiptsPage,
        TasksPage,
        TaskstepsPage,
        TimecardPage,
        ProfilePage
    ],
    providers: [
        LocationTrackerProvider,
        BackgroundGeolocation,
        Geolocation,
        AuthService,
        StatusBar,
        SplashScreen,
        [Storage],
        {        provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http]},
        { provide: ErrorHandler, useClass: IonicErrorHandler }
   // AuthServiceProvider
    ]
})
export class AppModule { }


