import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GoogleApiService } from "../../services/google-api.service";
import { Ruta } from "../../model/ruta";
import { Observable } from 'rxjs';
import { FireStoreService, Query } from '../../services/firestore.service';
import * as firebase from 'firebase/app';
import { AuthService } from "../../services/auth.service";

declare let google;


/**
 * Generated class for the RutaPage page.
 *
 * https://developers.google.com/maps/documentation/javascript/examples/directions-complex
 */

@Component({
  selector: 'page-ruta',
  templateUrl: 'ruta.html',
})
export class RutaPage {


  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public rutaForm: FormGroup;


  public changePoint: string;
  public locations: any;

  public direccion_origen: string;
  public direccion_destino: string;

  public coordenadas_origen: any;
  public coordenadas_destino: any;

  public info_origen: any;
  public info_destino: any;

  public municipio_origen: string;
  public municipio_destino: string;


  public id: string;


  public directionsDisplay


  constructor(public navCtrl: NavController,
    private fb: FormBuilder,
    private googleApi: GoogleApiService,
    private fs: FireStoreService,
    private auth: AuthService,
    public navParams: NavParams) {

    this.rutaForm = this.fb.group({
      origen: new FormControl(),
      destino: new FormControl()
    });

  }

  public ionViewDidLoad() {
    this.initMap();
    this.changeForm();
    this.getRutaIfExists();

  }



  public getRutaIfExists() {
    let paramRuta = this.navParams.get("item");

    if (paramRuta) {
      this.rutaForm.patchValue({
        origen: paramRuta.direccion_origen,
        destino: paramRuta.direccion_destino
      });

      this.direccion_origen = paramRuta.direccion_origen;
      this.direccion_destino = paramRuta.direccion_destino;

      this.coordenadas_origen = paramRuta.origen;
      this.coordenadas_destino = paramRuta.destino;
      this.id = paramRuta.id;
      this.municipio_origen = paramRuta.municipio_origen,
        this.municipio_destino = paramRuta.municipio_destino,
        console.log()

        this.getDirections(this.coordenadas_origen, this.coordenadas_destino).subscribe(response => {


          this.directionsDisplay.setDirections(response);
        });

    }

  }


  //Funcion que carga el mapa
  public initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });

    this.directionsDisplay = new google.maps.DirectionsRenderer({ map: this.map });


  }

  //Funcion que guarda la direccion origen y el destino y imprime en el mapa
  public onLocation(location: any) {


    this.rutaForm.markAsPristine();

    if (this.changePoint == 'origen') {

      this.direccion_origen = location.formatted_address;

      this.rutaForm.patchValue({
        origen: this.direccion_origen
      });
      this.info_origen = location;
      this.coordenadas_origen = location.geometry.location;
      this.municipio_origen = this.getCity(location.address_components);

    } else if (this.changePoint == 'destino') {

      this.direccion_destino = location.formatted_address;
      this.rutaForm.patchValue({
        destino: this.direccion_destino
      });
      this.info_destino = location;
      this.coordenadas_destino = location.geometry.location;
      this.municipio_destino = this.getCity(location.address_components);

    }

    if (this.direccion_origen && this.direccion_destino) {

      this.getDirections(this.coordenadas_origen,
        this.coordenadas_destino).subscribe(response => {
        this.directionsDisplay.setDirections(response);
      });


    }



  }



  //FUncion para imprimir las indicaciones en el mapa
  public getDirections(origen: any, destino: any): Observable < any > {

    return new Observable(observer => {

      let directionsService = new google.maps.DirectionsService;

      directionsService.route({
        origin: origen,
        destination: destino,
        travelMode: 'WALKING'
      }, function(response, status) {
        observer.next(response);
        observer.complete();

      });

    });


  }

  //funcion para detectar cambio en el formulario
  public changeForm(): void {
    this.rutaForm.get('origen').valueChanges.subscribe(val => {
      this.googleApi.searchLocation(val).subscribe(data => {
        this.locations = data.results;
        this.changePoint = 'origen';
      });
    });

    this.rutaForm.get('destino').valueChanges.subscribe(val => {
      this.googleApi.searchLocation(val).subscribe(data => {
        this.locations = data.results;
        this.changePoint = 'destino';

      });
    });

  }


  public onSave() {
    this.fs.setEntity('rutas');


    let ruta = {
      direccion_origen: this.direccion_origen,
      coordenadas_origen: new firebase.firestore.GeoPoint(this.coordenadas_origen.lat, this.coordenadas_destino.lng),
      direccion_destino: this.direccion_destino,
      coordenadas_destino: new firebase.firestore.GeoPoint(this.coordenadas_destino.lat, this.coordenadas_destino.lng),
      uid: this.auth.user.uid,
      municipio_origen: this.municipio_origen,
      municipio_destino: this.municipio_destino
    }


    if (this.id) {
      ruta['id'] = this.id;
      this.fs.update(ruta);
    } else {
      this.fs.create(ruta);
    }

    this.navCtrl.pop();
  }




  public getCity(components: any[]) {

    for (let component of components) {
      for (let type of component.types) {
        if (type == "locality") {
          return component.long_name;
        }
      }
    }

  }

}
