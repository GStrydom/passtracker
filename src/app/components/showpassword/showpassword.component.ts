import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-showpassword',
  templateUrl: './showpassword.component.html',
  styleUrls: ['./showpassword.component.css']
})
export class ShowpasswordComponent implements OnInit {
    items: Array<any>;
    itemId: string = '';

  constructor(
    public dialogRef: MatDialogRef<ShowpasswordComponent>, public firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getPasswords()
    .subscribe(result => {
      this.items = result;
    });
  }

  getItemId(item) {
    this.itemId = item.payload.doc.password;
  }

  close() {
    this.dialogRef.close();
  }
}
