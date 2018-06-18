import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GoogleApiService } from "../../services/google-api.service";
import { Ruta } from "../../model/ruta";
import { Observable } from 'rxjs';

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
  public locations: any;
  public changePoint: string;
  public ruta: Ruta = new Ruta();

  public directionsDisplay


  constructor(public navCtrl: NavController,
    private fb: FormBuilder,
    private googleApi: GoogleApiService) {

    this.rutaForm = this.fb.group({
      origen: new FormControl(),
      destino: new FormControl()

    });

  }

  public ionViewDidLoad() {
    this.initMap();
    this.changeForm();

  }

  public initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });

    this.directionsDisplay = new google.maps.DirectionsRenderer({ map: this.map });


  }

  public onLocation(location: any) {


    this.rutaForm.markAsPristine();

    if (this.changePoint == 'origen') {
      this.rutaForm.patchValue({
        origen: location.formatted_address
      });
      this.ruta.origen = location;

    } else if (this.changePoint == 'destino') {
      this.rutaForm.patchValue({
        destino: location.formatted_address
      });
      this.ruta.destino = location;
    }

    if (this.ruta.origen && this.ruta.destino) {

      this.getDirections().subscribe(response => {
        this.directionsDisplay.setDirections(response);
      });


    }



  }


  public getDirections(): Observable < any > {
    return new Observable(observer => {

      let directionsService = new google.maps.DirectionsService;

      directionsService.route({
        origin: this.ruta.origen.geometry.location,
        destination: this.ruta.destino.geometry.location,
        travelMode: 'WALKING'
      }, function(response, status) {

        observer.next(response);
        observer.complete();

      });

    });


  }


  public changeForm(): void {
    this.rutaForm.get('origen').valueChanges.subscribe(val => {
      this.googleApi.searchLocation(val).subscribe(data => {
        console.log(data);
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

}
