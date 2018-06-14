import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from "../services/auth.service";

import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main.page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  isAuthenticated = false;

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();





      this.authService.authState().subscribe(auth => {
        if (auth) {
          this.isAuthenticated = true;
          this.rootPage = MainPage;
        } else {
          this.isAuthenticated = false;
          this.rootPage = HomePage;
        }
      });


    });
  }
}
