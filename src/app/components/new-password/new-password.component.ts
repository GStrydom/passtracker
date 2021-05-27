import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from "../image-dialog/image-dialog.component";
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink: string = "";

  validation_messages = {
   'category': [
     { type: 'required', message: 'Category is required.' }
   ],
   'website': [
     { type: 'required', message: 'Website is required.' }
   ],
   'username': [
     { type: 'required', message: 'Username is required.' },
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
   ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      category: ['', Validators.required ],
      website: ['', Validators.required ],
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.avatarLink = result.link;
      }
    });
  }

  resetFields(){
    this.avatarLink = "";
    this.exampleForm = this.fb.group({
      category: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    this.firebaseService.createPassword(value, this.avatarLink)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
