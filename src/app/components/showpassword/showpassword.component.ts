import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { Router, Params } from '@angular/router';
import { TransferService } from '../../services/transfer.service';

@Component({
  selector: 'app-showpassword',
  templateUrl: './showpassword.component.html',
  styleUrls: ['./showpassword.component.scss']
})

export class ShowpasswordComponent implements OnInit {
    item = this.transferService.getData();

  constructor(public router: Router, public dialogRef: MatDialogRef<ShowpasswordComponent>, public firebaseService: AuthService, public transferService: TransferService) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
  
  edit(item) {
    this.close();
    this.router.navigate(['/details/' + item.payload.doc.id]);
  }
}
