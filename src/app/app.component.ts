import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { AuthService } from "../services/auth.service";

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      let config = {
        apiKey: "AIzaSyD5EzD157rKZsQrITNVfAB2Ruj0ToJgvRI",
        authDomain: "ionic-cadena.firebaseapp.com",
        databaseURL: "https://ionic-cadena.firebaseio.com",
        projectId: "ionic-cadena",
        storageBucket: "ionic-cadena.appspot.com",
        messagingSenderId: "627434895894"
      };

      
      firebase.initializeApp(config);


    });
  }
}
