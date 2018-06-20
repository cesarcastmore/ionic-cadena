import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { FireStoreService, Query } from '../../services/firestore.service';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})

export class PerfilPage {

  public perfil;

  constructor(private authService: AuthService,
    private menuCtrl: MenuController,
    private fs: FireStoreService) {

  }


  onLogout() {
    this.authService.signOut();
    this.menuCtrl.close();
  }

  ionViewDidLoad() {
    console.log(this.authService.user);
    this.perfil = {
      uid: this.authService.user.uid,
      email: this.authService.user.email,
      displayName: this.authService.user.displayName
    }
    this.fs.setEntity('usuarios');


    let query: Query = new Query();
    query._where('uid', '==', this.perfil.uid);

    this.fs.filter(query).valueChanges().subscribe(data => {
      console.log(data);

    });



  }
}
