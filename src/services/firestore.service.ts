import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

//https://firebase.google.com/docs/firestore/use-rest-api
//https://firebase.google.com/docs/firestore/reference/rest/v1beta1/projects.databases.documents/get

@Injectable()
export class FireStoreService {
  private itemsCollection: AngularFirestoreCollection < any > ;
  private entity;

  constructor(public db: AngularFirestore) {

  }


  public setEntity(entity: string) {
    this.entity = entity;

  }



  public filter(qf: Query) {
    this.itemsCollection = this.db.collection < any > (this.entity, ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;


      for (let _where of qf.where) {
        query = query.where(_where.key, _where.expresion, _where.value);
      }
      return query;

    });

    return this.itemsCollection;
  }


  public create(item: any) {
    this.itemsCollection = this.db.collection < any > (this.entity);
    const id = this.db.createId();
    return this.itemsCollection.doc(id).set(item);

  }
}





@Injectable()
export class FireStoreRESTService {
  private itemsCollection: AngularFirestoreCollection < any > ;
  private entity;

  constructor(public db: AngularFirestore) {

  }


  public setEntity(entity: string) {
    this.entity = entity;

  }



  public filter(qf: Query) {
    this.itemsCollection = this.db.collection < any > (this.entity, ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;


      for (let _where of qf.where) {
        query = query.where(_where.key, _where.expresion, _where.value);
      }
      return query;

    });

    return this.itemsCollection;
  }


  public create(item: any) {
    this.itemsCollection = this.db.collection < any > (this.entity);
    const id = this.db.createId();
    return this.itemsCollection.doc(id).set(item);

  }
}






export class Query {

  public where: QueryWhere[] = [];

  constructor() {

  }

  _where(key: string, expresion: any, value: any) {
    this.where.push(new QueryWhere(key, expresion, value));

  }

}





export class QueryWhere {

  public key: string;
  public expresion: any;
  public value: any;
  constructor(key: string, expresion: string, value: any) {
    this.key = key;
    this.expresion = expresion;
    this.value = value;

  }




}
