import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'; 

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('pimage').valueChanges();
  }

  getPassword(passwordKey){
    return this.db.collection('passwords').doc(passwordKey).snapshotChanges();
  }

  getGamingPasswords(){
     return this.db.collection('passwords',ref => ref.where('category', '>=', 'gaming')
      .where('category', '<=', 'gaming' + '\uf8ff'))
      .snapshotChanges()
  }

  getEmailPasswords(){
     return this.db.collection('passwords',ref => ref.where('category', '>=', 'email')
      .where('category', '<=', 'email' + '\uf8ff'))
      .snapshotChanges()
  }

  getSocialPasswords(){
     return this.db.collection('passwords',ref => ref.where('category', '>=', 'social')
      .where('category', '<=', 'social' + '\uf8ff'))
      .snapshotChanges()
  }

  getGeneralPasswords(){
     return this.db.collection('passwords',ref => ref.where('category', '>=', 'general')
      .where('category', '<=', 'general' + '\uf8ff'))
      .snapshotChanges()
  }

  updatePassword(passwordKey, value){
    value.nameToSearch = value.website.toLowerCase();
    return this.db.collection('passwords').doc(passwordKey).set(value);
  }

  deletePassword(passwordKey){
    return this.db.collection('passwords').doc(passwordKey).delete();
  }

  getPasswords(){
    return this.db.collection('passwords').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('passwords',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchCategories(searchValue){
    return this.db.collection('passwords',ref => ref.where('category', '>=', searchValue)
      .where('category', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  createPassword(value, avatar){
    return this.db.collection('passwords').add({
      category: value.category,
      nameToSearch: value.website.toLowerCase(),
      website: value.website,
      username: value.username,
      password: value.password,
      avatar: avatar
    });
  }
}
