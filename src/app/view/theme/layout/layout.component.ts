import { Component, OnInit } from '@angular/core';
import { Store ,select} from '@ngrx/store';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { navItems } from '../../_nav';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/service/app.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  stateSub:Subscription;
  constructor( 
    private router: Router,
    private modalService: NgbModal, 
    private store: Store<any>,
    private route:ActivatedRoute,
    private appSer: AppService
    ) { }
    public sidebarMinimized = false;
    public navItems = navItems;
  
    toggleMinimize(e) {
      this.sidebarMinimized = e;
    }

    userData:any={};
    url="";
  ngOnInit() {
    this.stateSub = this.store.pipe(select('applicationState')).subscribe(
      (appState) => {
     
        if(appState && appState.user){
           this.userData=appState.user; 
           this.url=this.userData.profile_picture;
        
      }

        
      });
  }
 

  openVerticallyCentered(deletepoup) {
    this.modalService.open(deletepoup, { centered: true });
  }
  logout() {
    this.modalService.dismissAll();
    this.appSer.logout();
    // window.location.reload();
    // localStorage.clear();
    // this.router.navigate(['/home']);
  }
}

