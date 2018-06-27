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
  public rutas: any[] = [];

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
      this.rutas = data;
    });

  }



  public onRemove(item: any) {
    this.fs.remove(item);
  }


  public onEdit(item: any) {
    this.navCtrl.push(this.rutaPage, {
      item: {
        id: item.id,
        origen: {
          lat: item.coordenadas_origen._lat,
          lng: item.coordenadas_origen._long,
        },
        destino: {
          lat: item.coordenadas_destino._lat,
          lng: item.coordenadas_destino._long
        },
        direccion_origen: item.direccion_origen,
        direccion_destino: item.direccion_destino,
        municipio_origen: item.municipio_origen,
        municipio_destino: item.municipio_destino,


      }
    });

  }


}
