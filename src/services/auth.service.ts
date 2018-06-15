import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
  public user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  signInWithEmail(email, password) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(email,
      password);
  }

  signUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }


  signOut(): Promise < void > {
    return this.afAuth.auth.signOut();
  }

  authState() {
    return this.afAuth.authState;
  }


   oauthSignIn(credential: any) {
      return this.afAuth.auth.signInWithCredential(credential);
    
  }

}
