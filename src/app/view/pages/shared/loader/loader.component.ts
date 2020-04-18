import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.subscription = this.ls.loaderState.subscribe((showState: boolean) => {
    //   this.show = showState;
    // });
  }
  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

}
