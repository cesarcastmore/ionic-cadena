import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoadingController, AlertController } from "ionic-angular";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";

import { AuthService } from "../..//services/auth.service";

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
    public navCtrl: NavController ) {

    this.userForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl()
    })

  }



  public goToSignUp() {
    console.log("entrooooo");
    this.navCtrl.push(SignupPage);
  }


  onSignin() {

    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
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

}
