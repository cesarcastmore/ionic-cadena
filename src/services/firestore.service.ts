import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Http, Response, Headers } from '@angular/http';
import { AuthService } from './auth.service';

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
    item['id']= id;
    return this.itemsCollection.doc(id).set(item);

  }

  public update(item: any) {
    this.itemsCollection = this.db.collection < any > (this.entity);
    return this.itemsCollection.doc(item.id).set(
      item, {
      merge: true 
    });

    

  }


}





@Injectable()
export class FireStoreRESTService {
  private itemsCollection: AngularFirestoreCollection < any > ;
  private entity;
  private url: string = "https://firestore.googleapis.com/v1beta1/projects/ionic-cadena/databases/(default)/documents/";

  constructor(private http: Http, private auth: AuthService) {

  }


  public setEntity(entity: string) {
    this.entity = entity;

  }



  public create(item: any) {

  }
  public get(): Observable < any > {

    console.log(this.auth.user);
        var headers = new Headers({  'Authorization': this.auth.token });

    return this.http.get(this.url + this.entity)
      .map(item => {
        return item;
      });


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
