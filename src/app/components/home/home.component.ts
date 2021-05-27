import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShowpasswordComponent } from '../showpassword/showpassword.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchValue: string = '';
  items: Array<any>;
  nameFilteredItems: Array<any>;
  totalPasswords: number = 0;
  duplicates: number = 0;
  weakpasswords: number = 0;

  constructor(public firebaseService: FirebaseService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getPasswords()
    .subscribe(result => {
      this.items = result;
      this.nameFilteredItems = result;
      this.totalPasswords = this.nameFilteredItems.length;
    });
  }

  hasDuplicates(arr) {
    return new Set(arr).size !== arr.length;
  }

  checkForDuplicates() {
    if (this.hasDuplicates(this.items)) {
        this.duplicates += 1;
    }
  }

  viewDetails(item) {
    this.router.navigate(['/details/' + item.payload.doc.id]);
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.nameFilteredItems = result;
      this.items = result;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ShowpasswordComponent, {
      height: '400px',
      width: '400px'
    });
  }
}
