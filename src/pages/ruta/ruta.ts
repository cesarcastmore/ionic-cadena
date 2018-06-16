import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

declare var google;


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
  map: any;
  public rutaForm: FormGroup;



  constructor(public navCtrl: NavController, 
    private fb: FormBuilder) {

    this.rutaForm= this.fb.group({
      origen: new FormControl(),
      destino: new FormControl()

    });

  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });

  }

  public onLocation(){
    this.rutaForm.markAsPristine();
        this.initMap();

  }
}
