import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, Params } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-gaming',
  templateUrl: './gaming.component.html',
  styleUrls: ['./gaming.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0}),
        animate(250)
      ])
    ])
  ]
})
export class GamingComponent implements OnInit {

  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  totalPasswords: number = 0;

  constructor(
    public firebaseService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getGamingPasswords()
    .subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
      this.totalPasswords = this.name_filtered_items.length;
    })
  }

  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    })
  }

  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

}
