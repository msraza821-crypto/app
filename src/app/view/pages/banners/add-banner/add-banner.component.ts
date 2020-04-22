import { Component, OnInit } from '@angular/core';
import { FormControl} from  "@angular/forms";

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {

  toppings = new FormControl();

  toppingList: string[] = ['Brand1', 'Brand2', 'Brand3', 'Brand4'];

  constructor() { }

  ngOnInit() {
  }
  brand()
  {
    console.log(this.toppings)
  }

}
