import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

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
    public firebaseService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      category: [this.item.category, Validators.required ],
      website: [this.item.website, Validators.required ],
      username: [this.item.username, Validators.required ],
      password: [this.item.password, Validators.required ]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.item.avatar = result.link;
      }
    });
  }

  onSubmit(value){
    value.avatar = this.item.avatar;
    // value.age = Number(value.age);
    this.firebaseService.updatePassword(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    )
  }

  delete(){
    this.firebaseService.deletePassword(this.item.id)
    .then(
      res => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
