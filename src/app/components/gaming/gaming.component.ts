import { Component } from '@angular/core';
import { CategorytemplateComponent } from '../categorytemplate/categorytemplate.component';
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

export class GamingComponent extends CategorytemplateComponent {
  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getGamingPasswords()
    .subscribe(result => {
      this.items = result;
      this.name_filtered_items = result;
      this.totalPasswords = this.name_filtered_items.length;
      this.checkDuplicates(result);
    })
  }
}