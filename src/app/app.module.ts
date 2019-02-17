import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { AttendancePage } from '../pages/attendance/attendance';
import { BookingHistoryPage } from '../pages/booking-history/booking-history';
import { HelpSupportPage } from '../pages/help-support/help-support';
import { TripDetailsPage } from '../pages/trip-details/trip-details';
import { RideInitiatePage } from '../pages/ride-initiate/ride-initiate';
import { StartTripPage } from '../pages/start-trip/start-trip';
import { InvoicePage } from '../pages/invoice/invoice';
import { StarRatingPage  } from '../pages/star-rating/star-rating';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { Diagnostic } from '@ionic-native/diagnostic';

import { PostServiceProvider } from '../providers/post-service/post-service';
import { LoaderServiceProvider } from '../providers/loader-service/loader-service';
import { HttpModule } from '@angular/http';
import { ShareProvider } from '../providers/share/share';
import { CurrentBookingPage } from '../pages/current-booking/current-booking';
import {IonicStorageModule } from "@ionic/storage";

import { Ionic2RatingModule } from 'ionic2-rating';
import { CallNumber } from '@ionic-native/call-number';
import { SharePage } from '../pages/share/share';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Market } from '@ionic-native/market';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { DirectionPage } from '../pages/direction/direction';
import { TripDirectionPage } from '../pages/trip-direction/trip-direction';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AttendancePage,
    CurrentBookingPage,
    BookingHistoryPage,
    HelpSupportPage,
    TripDetailsPage,
    RideInitiatePage,
    StartTripPage,
    InvoicePage,
    StarRatingPage,
    SharePage,
    DirectionPage,
    TripDirectionPage

  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule .forRoot(),
    Ionic2RatingModule,
    AgmCoreModule.forRoot({
          //apiKey: "AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE",
          apiKey: "AIzaSyCU3MooMxfcSusLCB_loPk8Wh6nV0imWZA",
          libraries: ["places"]
      })
  ],
  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AttendancePage,
    CurrentBookingPage,
    BookingHistoryPage,
    HelpSupportPage,
    TripDetailsPage,
    RideInitiatePage,
    StartTripPage,
    InvoicePage,
    StarRatingPage,
    SharePage,
    DirectionPage,
    TripDirectionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Diagnostic,
    PostServiceProvider,
    LoaderServiceProvider,
    ShareProvider,
    //Storage,
    CallNumber,
    SocialSharing,
    Market,
    LaunchNavigator 
  ]
})
export class AppModule {
  
}




 