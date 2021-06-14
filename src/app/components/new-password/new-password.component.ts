import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from "../image-dialog/image-dialog.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  exampleForm: FormGroup;
  avatarLink: string = "";
  generatedPassword: string = "";

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

  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: Router, public firebaseService: AuthService) { }

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

  generatePassword() {
    let password = "";
    const numbers = [0,1,2,3,4,5,6,7,8,9];
    const specials = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ")", "-", "_", "=", "+", "|", "\\"];
    const letters = ['a', 'A', 'b', "B", 'c', 'C', 'd', 'D', 'e', 'E'];
    const passwordLength = 4;
    for (let x=0; x<passwordLength; x++) {
      password += numbers[Math.floor(Math.random() * numbers.length)];
      password += specials[Math.floor(Math.random() * specials.length)];
      password += letters[Math.floor(Math.random() * letters.length)];
    }
    this.generatedPassword = password;
  }
}
