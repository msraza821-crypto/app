import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { rangeValidator } from 'src/app/validators/range.validator';
import { BLOCK_TAGS } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: "app-detail-discount",
  templateUrl: "./detail-discount.component.html",
  styleUrls: ["./detail-discount.component.css"]
})
export class DetailDiscountComponent implements OnInit {


  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  url1 = ''; url: string = '';
  message: string = '';
  keyValue: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _util: CommonUtil,
    private api:HttpService,
    private spinner:NgxSpinnerService,
    private _route:ActivatedRoute,
    private router: Router) {
  }


id:string=null;
  ngOnInit() {
    this._route.params.subscribe(param => {
      if (param && param["id"]) {
        this.id=param["id"];
        this.viewBrand();
      }
      })
  
  } 
  viewBrand(){
    this.spinner.show();
    this.api
    .getReqAuth("admin/discount/detail?id="+this.id)
    .subscribe(
      res => this.successView(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }
data:any={};
  successView(res){
    if(res.status==true){
    this.data= res.result;
    console.log(res)
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

  }
  
  error(res){
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this._util.markError(res.message);
  }
  
}


