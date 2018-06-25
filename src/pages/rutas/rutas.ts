import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FireStoreService, Query } from '../../services/firestore.service';
import { AuthService } from "../../services/auth.service";

import { RutaPage } from '../ruta/ruta';
/**
 * Generated class for the RutasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rutas',
  templateUrl: 'rutas.html',
})
export class RutasPage {

  private rutaPage = RutaPage;
  public rutas: any[]= [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fs: FireStoreService,
    private auth: AuthService) {

  }

  public openRuta() {
    this.navCtrl.push(this.rutaPage);
  }

  public ionViewDidLoad() {
    this.fs.setEntity('rutas');

    let query: Query = new Query();
    query._where('uid', '==', this.auth.user.uid);

    this.fs.filter(query).valueChanges().subscribe(data => {

    	this.rutas= data;
    });

  }


}
