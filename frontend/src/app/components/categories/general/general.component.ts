import { Component } from '@angular/core';
import { CategorytemplateComponent } from '../../ui/categorytemplate/categorytemplate.component';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0}),
        animate(250)
      ])
    ])
  ]
})

export class GeneralComponent extends CategorytemplateComponent {
  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getGeneralPasswords()
    .subscribe(result => {
      this.items = result;
      this.name_filtered_items = result;
      this.totalPasswords = this.name_filtered_items.length;
      this.checkDuplicates(result);
    })
  }
}