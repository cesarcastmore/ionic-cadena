import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  public openRuta() {
    this.navCtrl.push(this.rutaPage);
  }



}
