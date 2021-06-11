import { Component, OnInit } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
	passwords: any[] = [];
	header = true;
  constructor(private ngxCsvParser: NgxCsvParser) {}

  ngOnInit(): void {
    
  }
}
