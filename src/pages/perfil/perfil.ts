import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { FireStoreService, Query } from '../../services/firestore.service';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})

export class PerfilPage {

  public perfilForm: FormGroup;

  constructor(private authService: AuthService,
    private menuCtrl: MenuController,
    private fs: FireStoreService,
     private fb: FormBuilder) {

   this.perfilForm= this.fb.group({
     uid: new FormControl(),
     correo: new FormControl(),
     nombre: new FormControl(),
     apellido: new FormControl(),
     id: new FormControl()
   })

  }


  onLogout() {
    this.authService.signOut();
    this.menuCtrl.close();
  }

  ionViewDidLoad() {

    this.fs.setEntity('usuarios');

    let query: Query = new Query();
    query._where('uid', '==', this.authService.user.uid);

    this.fs.filter(query).valueChanges().subscribe(data => {

      console.log("DATAAAAA" , data);

      this.perfilForm.patchValue(data[0]);



    });

  }


  public onUpdate(){
    this.fs.update(this.perfilForm.value);
  }
}
