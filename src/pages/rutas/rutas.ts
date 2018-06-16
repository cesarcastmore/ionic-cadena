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
  	    this.initializeItems();

  }
  searchQuery: string = '';
  items: string[];

  public openRuta() {
    this.navCtrl.push(this.rutaPage);
  }
  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'

    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
