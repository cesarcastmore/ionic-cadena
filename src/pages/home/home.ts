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


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userForm: FormGroup;

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

    const loading = this.loadingCtrl.create({
      content: 'Iniciando sesion'
    });

    loading.present();

    this.authService.signin(this.userForm.value.email, this.userForm.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });

        alert.present();
      });
  }


  public loginFacebook() {
    const loading = this.loadingCtrl.create({
      content: 'Iniciando sesion'
    });

    loading.present();

    this.facebookLogin()
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });

        alert.present();
      });
  }

  public loginGoogle() {
    const loading = this.loadingCtrl.create({
      content: 'Iniciando sesion'
    });

    loading.present();

    this.gplus.login({}).then(res => {
        loading.dismiss();

      })
    .catch(err => console.error(err));
    }



    facebookLogin(): Promise < any > {
      return this.facebook.login(['email'])
        .then(response => {
          const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

          firebase.auth().signInWithCredential(facebookCredential)
            .then(success => {
              console.log("Firebase success: " + JSON.stringify(success));
            });

        }).catch((error) => { console.log(error) });
    }

  }
