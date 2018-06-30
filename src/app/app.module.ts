/*

FIREBASE Y ANGULARFIRE2
https://devdactic.com/ionic-firebase-angularfire/
https://angularfirebase.com/lessons/ionic-google-login-with-firebase-and-angularfire/
https://medium.com/@salonimalhotra1ind/ionic-google-sign-in-with-firebase-5d10282cc78
https://medium.com/appseed-io/integrating-firebase-password-and-google-authentication-into-your-ionic-3-app-2421cee32db9
https://angularfirebase.com/lessons/ionic-google-login-with-firebase-and-angularfire/ 
https://www.firebase.com/docs/web/libraries/angular/api.html

LIFECYCLE LIFE
https://blog.ionicframework.com/navigating-lifecycle-events/
http://www.ionichelper.com/2016/10/11/ionic-2-components-quick-guide-series-app/


PLUGIN

ionic cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="437270240078655" --variable APP_NAME="ionic-cadena"
ionic cordova plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID="627434895894-agnmqvlptc9f5r84uh3indcf40puua60.apps.googleusercontent.com"
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
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SolicitudesPage } from '../pages/solicitudes/solicitudes.page';
import { SolicitudPage } from '../pages/solicitud/solicitud';
import { RutaPage } from '../pages/ruta/ruta';
import { RutasPage } from '../pages/rutas/rutas';
import { HttpClientModule } from '@angular/common/http';

import { GoogleApiService } from '../services/google-api.service';
import { FireStoreService, FireStoreRESTService } from '../services/firestore.service';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';


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
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    HttpModule,



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
    GoogleApiService,
    AuthService,
    FireStoreService,
    GoogleApiService,
    FireStoreRESTService,
    Geolocation
  ]
})
export class AppModule {}
