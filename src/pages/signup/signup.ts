import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup,  FormBuilder,FormControl } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	public userForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private authService: AuthService, private fb:  FormBuilder) {

    this.userForm= this.fb.group({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  public onRegister(){
  	this.authService.signup(this.userForm.value.email, this.userForm.value.password)
      .then(data => {
      })
      .catch(error => {
       
      });

  }

}
