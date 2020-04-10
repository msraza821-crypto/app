import { Component, OnInit } from '@angular/core';
import { Store ,select} from '@ngrx/store';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor( 
    ) { }
    public sidebarMinimized = false;
    public navItems = navItems;
  
    toggleMinimize(e) {
      this.sidebarMinimized = e;
    }
  ngOnInit() {

  }

}

