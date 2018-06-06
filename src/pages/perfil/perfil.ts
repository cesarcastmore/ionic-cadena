import { Component } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})

export class PerfilPage {
	constructor( private authService: AuthService, private menuCtrl: MenuController){

	}


	  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
  }
}