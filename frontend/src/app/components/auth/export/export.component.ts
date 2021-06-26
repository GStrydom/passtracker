import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
	items: Array<any>;

  constructor(public firebaseService: AuthService) { }

  ngOnInit(): void {
  	this.getData();
  }

  getData(): void {
    this.firebaseService.getPasswords()
    .subscribe(result => {
      this.items = result;
    })
  }
}
