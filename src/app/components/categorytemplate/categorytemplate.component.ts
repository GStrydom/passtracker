import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShowpasswordComponent } from '../showpassword/showpassword.component';
import { TransferService } from '../../services/transfer.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-categorytemplate',
  templateUrl: './categorytemplate.component.html',
  styleUrls: ['./categorytemplate.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0}),
        animate(250)
      ])
    ])
  ]
})

export class CategorytemplateComponent implements OnInit {
  searchValue: string = "";
  items: Array<any>;
  name_filtered_items: Array<any>;
  totalPasswords: number = 0;
  duplicates: number = 0;
  weakpasswords: number = 0;

  constructor(public firebaseService: AuthService, private router: Router, public dialog: MatDialog, public transferService: TransferService) {}

  ngOnInit() {
    this.getData();
  }

  getData(){
  }

  containsDuplicates(a) {
    for (let i = 0; i < a.length; i++) {
      if (a.indexOf(a[i]) !== a.lastIndexOf(a[i])) {
        this.duplicates += 1;
        return true
      }
    }
    return false
  }

  checkDuplicates(result) {
    let dupArray = [];
      for (let x=0; x < result.length; x++) {
        dupArray.push(result[x].payload.doc.data()['password']);
      }
      let numpasses = dupArray.length;
      console.log("There are " + numpasses.toString());
      this.containsDuplicates(dupArray);
  }

  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = result;
    })
  }

  openDialog(item) {
    this.transferService.setData(item);
    const dialogRef = this.dialog.open(ShowpasswordComponent, {
      height: '400px',
      width: '400px'
    });
  }

  delete(item){
    this.firebaseService.deletePassword(item.id)
    .then(
      res => {
        this.router.navigate(['home']);
      },
      err => {
        console.log(err);
      }
    )
  }
}
