import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { FireStoreService, Query } from '../../services/firestore.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


/**
 * Generated class for the SolicitudPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-solicitud',
  templateUrl: 'solicitud.html',
})
export class SolicitudPage {

  public rutas: any[];
  public solicitudForm: FormGroup;
  W

  constructor(public navCtrl: NavController,
    private fs: FireStoreService,
    private auth: AuthService,
    private fb: FormBuilder) {

    this.solicitudForm = this.fb.group({
      fecha_inicio: new FormControl(),
      ruta_id: new FormControl(),
      uid: new FormControl(this.auth.user.uid),
      municipio_origen: new FormControl(),
      municipio_destino: new FormControl()

    });

    this.updateMunicipios();

  }


  public ionViewDidLoad() {
    this.fs.setEntity('rutas');

    let query: Query = new Query();
    query._where('uid', '==', this.auth.user.uid);
    this.fs.filter(query).valueChanges().subscribe(data => {
      this.rutas = data;
    });

  }


  public updateMunicipios() {
    this.solicitudForm.get('ruta_id').valueChanges.subscribe(ruta_id => {
      let ruta: any = this.rutas.find(r => 
      {
        console.log("R", r);
        if (r.id == ruta_id) {
          console.log("R", r);
          return r;
        }
      })

      this.solicitudForm.patchValue({
        municipio_origen: ruta.municipio_origen,
        municipio_destino: ruta.municipio_destino
      })

    });
  }



  public onSave() {
    this.fs.setEntity('solicitudes');

    this.fs.create(this.solicitudForm.value);
    this.navCtrl.pop();


  }





}
