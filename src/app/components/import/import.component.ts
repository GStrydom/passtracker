import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
	passwords: any[] = [];
	header = true;
  constructor() {}

  ngOnInit(): void {
    
  }
}
