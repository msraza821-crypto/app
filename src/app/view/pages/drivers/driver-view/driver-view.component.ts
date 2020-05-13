import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-driver-view',
  templateUrl: './driver-view.component.html',
  styleUrls: ['./driver-view.component.scss']
})
export class DriverViewComponent implements OnInit {



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
  user_id;
  collection=[]
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
          this.myStatus=param['status'];
          this.user_id=param['driver_id']
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
grandTotal:number=0;
discount_price:number=0;
shippingCharges:number=0;
  successView(res){
    this.spinner.hide();
    if(res.status==true){
      console.log(res.result)
      if(res.result.length>0){
      this.collection=res.result;
      this.data=res.result[0];
    if(this.collection.length>0){ 
      this.collection=res.result
      for(let col of this.collection)
        {
          this.discount_price=this.discount_price+Number(col.discounted_price);
          this.grandTotal=this.grandTotal+(col.quantity*col.price)
          this.shippingCharges=this.shippingCharges+(col.shipping_charges)
        }
    }
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
   
  //  this.addProperty.get('beds').patchValue(property['bed']);
  }
  }
}
  
  error(res){
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this._util.markError(res.message);
  }


}