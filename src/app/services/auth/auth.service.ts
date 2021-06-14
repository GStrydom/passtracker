import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
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
          this.router.navigate(['home']).then(r => {});
        });
        this.SetUserData(result.user).then(r => {}).catch((error) => {
          window.alert(error.message)
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Reset password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      // displayName: user.email,
      // emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  emailSignup(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
     console.log('Success', value);
     this.router.navigateByUrl('home').then(r => {});
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']).then(r => {});
      location.reload();
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    return (user !== null);
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
    console.log("Deleting");
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
