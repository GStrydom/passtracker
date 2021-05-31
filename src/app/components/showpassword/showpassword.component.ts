import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-showpassword',
  templateUrl: './showpassword.component.html',
  styleUrls: ['./showpassword.component.scss']
})
export class ShowpasswordComponent implements OnInit {
    items: Array<any>;
    itemId: string = '';

  constructor(
    public dialogRef: MatDialogRef<ShowpasswordComponent>, public firebaseService: AuthService,
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
