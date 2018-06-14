import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from "../services/auth.service";
import { MainPage } from "../pages/main/main.page";
import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
//https://devdactic.com/ionic-firebase-angularfire/

export const firebaseConfig = {
  fire: {
    apiKey: "AIzaSyD5EzD157rKZsQrITNVfAB2Ruj0ToJgvRI",
    authDomain: "ionic-cadena.firebaseapp.com",
    databaseURL: "https://ionic-cadena.firebaseio.com",
    projectId: "ionic-cadena",
    storageBucket: "ionic-cadena.appspot.com",
    messagingSenderId: "627434895894"
  }
};



import { PerfilPage } from '../pages/perfil/perfil';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    PerfilPage,
    MainPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    PerfilPage,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Facebook,
    GooglePlus,
    AngularFireAuth
  ]
})
export class AppModule {}
