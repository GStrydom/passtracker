import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class AuthService {
  userData: any;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router, public ngZone: NgZone) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  login(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  emailSignup(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
     console.log('Sucess', value);
     this.router.navigateByUrl('/profile');
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider);
  }

  getAvatars(){
      return this.afs.collection('pimage').valueChanges();
  }

  getPassword(passwordKey){
    return this.afs.collection('passwords').doc(passwordKey).snapshotChanges();
  }

  getGamingPasswords(){
     return this.afs.collection('passwords',ref => ref.where('category', '>=', 'gaming')
      .where('category', '<=', 'gaming' + '\uf8ff'))
      .snapshotChanges()
  }

  getEmailPasswords(){
     return this.afs.collection('passwords',ref => ref.where('category', '>=', 'email')
      .where('category', '<=', 'email' + '\uf8ff'))
      .snapshotChanges()
  }

  getSocialPasswords(){
     return this.afs.collection('passwords',ref => ref.where('category', '>=', 'social')
      .where('category', '<=', 'social' + '\uf8ff'))
      .snapshotChanges()
  }

  getGeneralPasswords(){
     return this.afs.collection('passwords',ref => ref.where('category', '>=', 'general')
      .where('category', '<=', 'general' + '\uf8ff'))
      .snapshotChanges()
  }

  updatePassword(passwordKey, value){
    value.nameToSearch = value.website.toLowerCase();
    return this.afs.collection('passwords').doc(passwordKey).set(value);
  }

  deletePassword(passwordKey){
    return this.afs.collection('passwords').doc(passwordKey).delete();
  }

  getPasswords(){
    return this.afs.collection('passwords').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.afs.collection('passwords',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchCategories(searchValue){
    return this.afs.collection('passwords',ref => ref.where('category', '>=', searchValue)
      .where('category', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  createPassword(value, avatar){
    return this.afs.collection('passwords').add({
      category: value.category,
      nameToSearch: value.website.toLowerCase(),
      website: value.website,
      username: value.username,
      password: value.password,
      avatar: avatar
    });
  }
}
