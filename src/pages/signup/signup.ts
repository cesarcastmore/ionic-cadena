import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { FireStoreService, Query } from '../../services/firestore.service';

/*
export ANDROID_HOME=~/Android/Sdk/
export PATH=${PATH}:~/Android/Sdk/platform-tools:~/Android/Sdk/tools
export PATH=$PATH:/opt/gradle/gradle-4.8/bin
export PATH=$PATH:/opt/gradle/gradle-4.8/bin
source ~/.bash_profile
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public userForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService, private fb: FormBuilder, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private fs: FireStoreService) {

    this.userForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  public onRegister() {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authService.signUp(this.userForm.value.email, this.userForm.value.password)
      .then(data => {

        console.log("CREANDO UN USUARIO", data);
        this.fs.setEntity("usuarios");

        let usuario = {
          uid: data.user.uid,
          email: data.user.email,
          displayName: data.user.displayName
        }

        this.fs.create(usuario);


        loading.dismiss();
        this.navCtrl.pop();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });

  }

}
