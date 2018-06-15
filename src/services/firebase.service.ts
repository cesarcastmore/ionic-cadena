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
  	let newItem = this.afd.list('/'+this.entity + '/').push(item);
    item['id'] = newItem.key;
    return item;
  }


  public update(item: any){
    let updateItem = this.afd.list('/'+this.entity + '/');
    let id = item.id; 
    updateItem.update(id, item
);
    item['id'] = id;

    return item;
  }



}
