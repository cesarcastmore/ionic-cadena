import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { FireBaseService } from "../../services/firebase.service";


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})

export class PerfilPage {

  public perfil; 

  constructor(private authService: AuthService, 
  	private fbs: FireBaseService,
  	private menuCtrl: MenuController) {

  }


  onLogout() {
    this.authService.signOut();
    this.menuCtrl.close();
  }

  ionViewDidLoad(){
    this.fbs.setEntity('perfiles');
    console.log(this.authService.user);
    this.perfil = {
      uid: this.authService.user.uid,
      email: this.authService.user.email,
      displayName: this.authService.user.displayName
    }
    ;
  	this.perfil = this.fbs.create(this.perfil);
    this.perfil['nombre']='cesar';
        this.perfil['apellido']='castillo';

    this.perfil = this.fbs.update(this.perfil);

    console.log(this.perfil);



  }
}
