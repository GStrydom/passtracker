import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-showpassword',
  templateUrl: './showpassword.component.html',
  styleUrls: ['./showpassword.component.scss']
})
export class ShowpasswordComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ShowpasswordComponent>,
  ) { }

  ngOnInit() {

  }

  close() {
    this.dialogRef.close();
  }

}
