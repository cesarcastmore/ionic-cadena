import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {  FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GoogleApiService } from "../../services/google-api.service";

declare let google;


/**
 * Generated class for the RutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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

  }

  public onLocation(location: any) {


    this.rutaForm.markAsPristine();
    if (this.changePoint == 'origen') {
      this.rutaForm.patchValue({
        origen: location.formatted_address
      });
    } else if (this.changePoint == 'destino') {
      this.rutaForm.patchValue({
        destino: location.formatted_address
      });
    }

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
