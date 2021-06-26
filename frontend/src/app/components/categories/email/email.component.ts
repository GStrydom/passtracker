import { Component } from '@angular/core';
import { CategorytemplateComponent } from '../../ui/categorytemplate/categorytemplate.component';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0}),
        animate(250)
      ])
    ])
  ]
})

export class EmailComponent extends CategorytemplateComponent {
  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getEmailPasswords()
    .subscribe(result => {
      this.items = result;
      this.name_filtered_items = result;
      this.totalPasswords = this.name_filtered_items.length;
      this.checkDuplicates(result);
    })
  }
}
