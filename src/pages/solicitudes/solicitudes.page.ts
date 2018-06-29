import { Component } from '@angular/core';
import { SolicitudPage } from '../solicitud/solicitud';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireStoreService, Query } from '../../services/firestore.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'page-solicitudes',
  templateUrl: 'solicitudes.html'
})

export class SolicitudesPage {
	private solicitudPage= SolicitudPage;

	public solicitudes: any[];

  constructor(public navCtrl: NavController,
  	   private fs: FireStoreService,
    private auth: AuthService) {


  }

  public ionViewDidLoad() {
    this.fs.setEntity('solicitudes');

    let query: Query = new Query();
    query._where('uid', '==', this.auth.user.uid);

    this.fs.filter(query).valueChanges().subscribe(data => {
      this.solicitudes = data;
    });

  }



  public openSolicitud() {

    this.navCtrl.push(this.solicitudPage);
  }

}
