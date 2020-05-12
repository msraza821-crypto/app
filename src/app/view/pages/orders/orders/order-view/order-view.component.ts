import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { rangeValidator } from 'src/app/validators/range.validator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throwIfEmpty } from 'rxjs/operators';


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

 
  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  url1 = ''; url: string = '';
  message: string = '';
  flag: boolean = false;
  limit=10;
  page=1;
  totalRec=10;
  id:string=null;
  myStatus=''
  deletedId;
  statusData;
  constructor(
    private _fb: FormBuilder,
    private _util: CommonUtil,
    private api:HttpService,
    private spinner:NgxSpinnerService,
    private _route:ActivatedRoute,
    private router: Router,
    private modalService:NgbModal) {
      this._route.params.subscribe(param => {
        if (param && param["id"]) {
          this.id=param["id"];
          this.myStatus=param['status']
          this.viewOrder()
        }
        });
        
        
      }

  ngOnInit()
  {

  }
  openVerticallyCentered(poup, data) {
    this.modalService.open(poup, { centered: true });
    this.deletedId = data.id;
    this.statusData = data.status;
  }
  viewOrder(){
    this.spinner.show();
    console.log('vieew')
    this.api
    .getReqAuth("admin/order/order-detail?id="+this.id)
    .subscribe(
      res => this.successView(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }

data:any={};
  successView(res){
    if(res.status==true){
      this.spinner.hide
    this.data= res.result;
    console.log(this.data)
  
    }
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
   
  //  this.addProperty.get('beds').patchValue(property['bed']);

  }
  
  error(res){
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this._util.markError(res.message);
  }

  }


