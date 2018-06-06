import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  private rootPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootPage = PerfilPage;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openPage(p) {
    this.rootPage = p;
  }

}