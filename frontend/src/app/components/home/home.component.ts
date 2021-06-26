// noinspection TaskProblemsInspection

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShowpasswordComponent } from '../ui/showpassword/showpassword.component';
import { TransferService } from '../../services/transfer.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0}),
        animate(250)
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {
  searchValue: string;
  items: Array<any>;
  nameFilteredItems: Array<any>;
  totalPasswords: number;
  duplicates: number;
  weakpasswords: number;

  // tslint:disable-next-line:max-line-length
  constructor(public firebaseService: AuthService, private router: Router, public dialog: MatDialog, public transferService: TransferService) {}
  ngOnInit(): void {
    this.getData();
    this.checkPasswordsStrength('password');
  }

  // Check if our results array contains any duplicates
  containsDuplicates(a): boolean {
    for (const i of a.length) {
      if (a.indexOf(a[i]) !== a.lastIndexOf(a[i])) {
        this.duplicates += 1;
        return true;
      }
    }
    return false;
  }

  getData(): void {
    this.firebaseService.getPasswords()
    .subscribe(result => {
      this.items = result;
      this.nameFilteredItems = result;
      this.totalPasswords = this.nameFilteredItems.length;

      const dupArray = [];
      // @ts-ignore
      for (const x of result.length) {
        // @ts-ignore
        dupArray.push(result[x].payload.doc.data().password);
      }
      this.containsDuplicates(dupArray);
      this.checkPasswordsStrength(dupArray);
    });
  }

  // Check our password strength.
  checkPasswordsStrength(dupArray): void {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    for (const x of dupArray.length) {
      if (strongRegex.test(dupArray[x])) {
        console.log('Strong password');
      } else if (mediumRegex.test(dupArray[x])) {
        console.log('Medium password');
      } else {
        this.weakpasswords += 1;
      }
    }
  }

  viewDetails(item): void {
    this.router.navigate(['/details/' + item.payload.doc.id]).then(r => {});
  }

  // capitalizeFirstLetter(value): string {
  //   return value.charAt(0).toUpperCase() + value.slice(1);
  // }

  searchByName(): void {
    const value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.nameFilteredItems = result;
      this.items = result;
    });
  }

  // Show the password dialog
  openDialog(item): void {
    this.transferService.setData(item);
    const dialogRef = this.dialog.open(ShowpasswordComponent, {
      height: '400px',
      width: '400px'
    });
  }

  deleteItem(item): void{
    this.firebaseService.deletePassword(item.payload.doc.id)
    .then(
      res => {
        this.router.navigate(['home']).then(r => {});
      },
      err => {
        console.log(err);
      }
    );
  }
}
