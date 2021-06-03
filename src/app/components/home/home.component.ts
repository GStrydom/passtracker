import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShowpasswordComponent } from '../showpassword/showpassword.component';
import { TransferService } from '../../services/transfer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchValue: string = '';
  items: Array<any>;
  nameFilteredItems: Array<any>;
  totalPasswords: number = 0;
  duplicates: number = 0;
  weakpasswords: number = 0;

  constructor(public firebaseService: AuthService, private router: Router, public dialog: MatDialog, public transferService: TransferService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getPasswords()
    .subscribe(result => {
      this.items = result;
      this.nameFilteredItems = result;
      this.totalPasswords = this.nameFilteredItems.length;
      
      // This is bad!!!
      let dupArray = [];
      for (let x=0; x < result.length; x++) {
        dupArray.push(result[x].payload.doc.data()['password'])
      }
      if (this.hasDuplicates(dupArray)) {
        console.log('Duplicates found');
      }
    })
  }

  hasDuplicates(arr) {
    return new Set(arr).size !== arr.length;
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

  openDialog(item) {
    this.transferService.setData(item);
    const dialogRef = this.dialog.open(ShowpasswordComponent, {
      height: '400px',
      width: '400px'
    });
  }
}
