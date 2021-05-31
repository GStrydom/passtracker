import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Nice, it worked!');
      this.router.navigateByUrl('/profile');
    })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
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

  isLoggedIn() {
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
