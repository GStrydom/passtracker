import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {

  avatars: Array<any> = new Array<any>();

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getAvatars()
    .subscribe(data => this.avatars = data);
  }

  close(avatar){
    this.dialogRef.close(avatar);
  }

}
