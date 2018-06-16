import { Component } from '@angular/core';
import { SolicitudPage } from '../solicitud/solicitud';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-solicitudes',
  templateUrl: 'solicitudes.html'
})

export class SolicitudesPage {
	private solicitudPage= SolicitudPage;

  constructor(public navCtrl: NavController) {


  }



  public openSolicitud() {

    this.navCtrl.push(this.solicitudPage);
  }

}
