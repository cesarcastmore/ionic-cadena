import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoadingController, AlertController } from "ionic-angular";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";

import { AuthService } from "../..//services/auth.service";
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import firebase from 'firebase';

//https://angularfirebase.com/lessons/ionic-google-login-with-firebase-and-angularfire/
//https://medium.com/@salonimalhotra1ind/ionic-google-sign-in-with-firebase-5d10282cc78
//https://medium.com/appseed-io/integrating-firebase-password-and-google-authentication-into-your-ionic-3-app-2421cee32db9
//https://angularfirebase.com/lessons/ionic-google-login-with-firebase-and-angularfire/ 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userForm: FormGroup;

  private loading = this.loadingCtrl.create({
    content: 'Iniciando sesion'
  });

  private alert = this.alertCtrl.create({
    title: 'Error al iniciar sesion!',
    buttons: ['Ok']
  });


  constructor(private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    public navCtrl: NavController,
    private facebook: Facebook,
    private gplus: GooglePlus) {

    this.userForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl()
    })

  }



  public goToSignUp() {
    this.navCtrl.push(SignupPage);
  }


  onSignin() {


    this.loading.present();

    this.authService.signInWithEmail(this.userForm.value.email, this.userForm.value.password)
      .then(data => {
        this.loading.dismiss();
      })
      .catch(error => {

        this.loading.dismiss();
        this.alert.setMessage(error.message);
        this.alert.present();

      });
  }



  public loginGoogle() {

    this.loading.present();

    this.gplus.login({
        'webClientId': '627434895894-agnmqvlptc9f5r84uh3indcf40puua60.apps.googleusercontent.com',
        'offline': false,
        'scopes': 'profile email'
      }).then(response => {

        this.loading.dismiss();


        const googlePlusCredential = firebase.auth.GoogleAuthProvider
          .credential(response.idToken);

        this.authService.oauthSignIn(googlePlusCredential).then(success => {

        }).catch(error => {
          console.log(error);

        });



      })
      .catch(error => {
        this.alert.setMessage(error);
        this.alert.present();

      });
  }





  // Metodo para iniciar sesion de facebook
  public loginFacebook() {


    this.loading.present();

    this.facebookLogin()
      .then(data => {
        this.loading.dismiss();
      })
      .catch(error => {

        this.loading.dismiss();
        this.alert.setMessage(error);
        this.alert.present();

      });
  }




  facebookLogin(): Promise < any > {
    return this.facebook.login(['email'])
      .then(response => {

        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        this.authService.oauthSignIn(facebookCredential).then(success => {
          console.log("Firebase success: " + JSON.stringify(success));
        });

      }).catch((error) => { console.log(error); });
  }

}
