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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userForm: FormGroup;

  private loading = this.loadingCtrl.create({
    content: 'Iniciando sesion'
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

    this.authService.signin(this.userForm.value.email, this.userForm.value.password)
      .then(data => {
        this.loading.dismiss();
      })
      .catch(error => {
        this.loading.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });

        alert.present();
      });
  }


  public loginFacebook() {


    this.loading.present();

    this.facebookLogin()
      .then(data => {
        this.loading.dismiss();
      })
      .catch(error => {
        this.loading.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });

        alert.present();
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

        console.log("entrando aqui");

        const googlePlusCredential = firebase.auth.GoogleAuthProvider
          .credential(response.idToken);

        firebase.auth().signInWithCredential(googlePlusCredential).then(success => {
          console.log("Firebase success: " + JSON.stringify(success));
          const alert = this.alertCtrl.create({
            title: 'Ha entrado',
            message: 'entrooo',
            buttons: ['Ok']
          });
          alert.present();
        }).catch(error=>{
           const alert = this.alertCtrl.create({
            title: 'Ha error',
            message: error,
            buttons: ['Ok']
          });
          alert.present();
        });



      })
      .catch(err => {
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: err,
          buttons: ['Ok']
        });
        alert.present();
        

      });
  }



  facebookLogin(): Promise < any > {
    return this.facebook.login(['email'])
      .then(response => {

        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential).then(success => {
          console.log("Firebase success: " + JSON.stringify(success));
        });

      }).catch((error) => { console.log(error) });
  }

}
