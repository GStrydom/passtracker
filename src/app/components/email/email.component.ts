import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})

export class EmailComponent implements OnInit {
  searchValue: string = "";
  items: Array<any>;
  name_filtered_items: Array<any>;
  totalPasswords: number = 0;
  duplicates: number = 0;
  weakpasswords: number = 0;

  constructor(public firebaseService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getEmailPasswords()
    .subscribe(result => {
      this.items = result;
      this.name_filtered_items = result;
      this.totalPasswords = this.name_filtered_items.length;
    })
  }

  hasDuplicates(arr) {
    return new Set(arr).size !== arr.length;
  }

  checkForDuplicates() {
    if(this.hasDuplicates(this.items)) {
        this.duplicates += 1;
    } 
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
}
