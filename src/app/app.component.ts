import { Component, AfterViewInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location,PlatformLocation } from "@angular/common";
import { AppService } from './service/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  promptEvent: any
  constructor(private router: Router,
    private _location: Location,
    location: PlatformLocation, 
    private appSer: AppService,
    private modalService: NgbModal,
    private store: Store<any>
    ) {
  
  }
  currentUser: any;
  city = '';
  ngOnInit() {
   
    this.subscribeToBlocked();
    this.subscribeToBlocked1();

    this.subscribeToBlocked2();

    this.subscribeToBlocked3();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
  subscribeToBlocked() {
    this.appSer.blocked.subscribe((block) => {
      if (block) {
        // this.appSer.logout();
        var content = 'Internet connection fail';
        //  this.openLogoutPopUp('#internetpoup');
        this.openLogoutPopUp();
      }
    });
  }
  subscribeToBlocked1() {
    this.appSer.blocked1.subscribe((block) => {
      if (block) {
        this.appSer.logout();
        var content = 'Internet connection fail';
        //  this.openLogoutPopUp('#internetpoup');
        this.openLogoutPopUp1();
      }
    });
  }
  subscribeToBlocked2() {
    this.appSer.blocked2.subscribe((block) => {
      if (block) {
        //  alert(1)
        this.appSer.logout();
        var content = 'Internet connection fail';
        //  this.openLogoutPopUp('#internetpoup');
        this.openLogoutPopUp2();
      }
    });
  }
  subscribeToBlocked3() {
    this.appSer.blocked3.subscribe((block) => {
      if (block) {
        this.appSer.logout();
        var content = 'Internet connection fail';
        //  this.openLogoutPopUp('#internetpoup');
        this.openLogoutPopUp3();
      }
    });
  }
  openLogoutPopUp() {
    var internetpoup = document.getElementById('popup');
    internetpoup.click();

  }
  openLogoutPopUp1() {
    var internetpoup = document.getElementById('popup1');
    internetpoup.click();

  }
  openLogoutPopUp2() {
    var internetpoup = document.getElementById('popup2');
    internetpoup.click();

  }
  openLogoutPopUp3() {
    var internetpoup = document.getElementById('popup3');
    // internetpoup.click();

  }
  popup(internetpoup) {
    this.modalService.open(internetpoup, { centered: true });
  }
  logout() {
    this.modalService.dismissAll();
    this.appSer.logout();

  }
  backClicked() {
    this._location.back();
  }

}


