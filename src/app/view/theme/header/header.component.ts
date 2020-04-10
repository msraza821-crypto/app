import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { Store, select } from "@ngrx/store";
import * as AppActions from "src/app/store/actions/app.actions";
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 

  constructor(
    // private loginService:LoginService,
    private api: ProfileService,
    private loginservice: LoginService,
    private router: Router,
    private ls: LoaderService,private store: Store<any>,
    private appSer: AppService,
    private profileService: ProfileService
  ) { }
  ngOnInit(){
    
  }
}
