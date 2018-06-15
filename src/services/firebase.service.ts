import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the FireBaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireBaseService {

	public entity: string;

  constructor(public afd: AngularFireDatabase) {
    console.log('Hello FireBaseProvider Provider');
  }


  public setEntity(entity: string){
  	this.entity= entity;
  }


  public create(item: any){
  	return this.afd.list('/'+this.entity + '/').push(item);
  }



}
