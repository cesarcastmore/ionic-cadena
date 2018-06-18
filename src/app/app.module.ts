/*

FIREBASE Y ANGULARFIRE2
https://devdactic.com/ionic-firebase-angularfire/
https://angularfirebase.com/lessons/ionic-google-login-with-firebase-and-angularfire/
https://medium.com/@salonimalhotra1ind/ionic-google-sign-in-with-firebase-5d10282cc78
https://medium.com/appseed-io/integrating-firebase-password-and-google-authentication-into-your-ionic-3-app-2421cee32db9
https://angularfirebase.com/lessons/ionic-google-login-with-firebase-and-angularfire/ 


LIFECYCLE LIFE
https://blog.ionicframework.com/navigating-lifecycle-events/
http://www.ionichelper.com/2016/10/11/ionic-2-components-quick-guide-series-app/
*/

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
import { AngularFireDatabase } from 'angularfire2/database';
import { SolicitudesPage } from '../pages/solicitudes/solicitudes.page';
import { SolicitudPage } from '../pages/solicitud/solicitud';
import { RutaPage } from '../pages/ruta/ruta';
import { RutasPage } from '../pages/rutas/rutas';
import { HttpClientModule } from '@angular/common/http'; 
import { GoogleApiService } from  '../services/google-api.service';

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
import { FireBaseService } from "../services/firebase.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    PerfilPage,
    MainPage,
    SolicitudesPage,
    SolicitudPage,
    RutaPage,
    RutasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    HttpClientModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    PerfilPage,
    MainPage,
    SolicitudesPage,
    SolicitudPage,
    RutaPage,
    RutasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Facebook,
    GooglePlus,
    AngularFireAuth,
    AngularFireDatabase,
    FireBaseService,
    GoogleApiService
  ]
})
export class AppModule {}
