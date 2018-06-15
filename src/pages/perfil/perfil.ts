import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { FireBaseService } from "../../services/firebase.service";


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})

export class PerfilPage {
  constructor(private authService: AuthService, 
  	private fbs: FireBaseService,
  	private menuCtrl: MenuController) {

  }


  onLogout() {
    this.authService.signOut();
    this.menuCtrl.close();
  }

  ionViewDidLoad(){
    this.fbs.setEntity('perfil');
  	this.fbs.create({
  		name: 'hello'
  	})



  }
}
