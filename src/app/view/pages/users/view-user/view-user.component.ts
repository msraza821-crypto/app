import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DateFormatPipe} from 'src/app/pipes/date-format.pipe'

@Component({
  selector: "app-view-user",
  templateUrl: "./view-user.component.html",
  styleUrls: ["./view-user.component.css"]
})
export class ViewUserComponent implements OnInit {


  loader = false;
  collection:any=[];
  CONFIG = CONFIG;
  loginForm: FormGroup;
  url1 = ''; url: string = '';
  message: string = '';
  keyValue: boolean = false;
  limit=10;
  page=1;
  status;
  totalRec=10;
  orderList=[];
  constructor(
    private _fb: FormBuilder,
    private _util: CommonUtil,
    private api: HttpService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute,
    private _api:AppService,
    private router: Router) {
  }

  rtl(element) {
    if (element.setSelectionRange) {
      element.setSelectionRange(0, 0);
    }
  }
  id: string = null;
  ngOnInit() {
    this._route.params.subscribe(param => {
      if (param && param["id"]) {
        this.id = param["id"];
        this.status=param['status']
        this.viewUser();
      }
    })

  }

  yes() {
    this.modalService.dismissAll();
    //var formData=new FormData();
    //   formData.append('id',this.deletedId)
    this.api
      .putReqAuth("admin/user/delete", { id:this.id}).subscribe(
        res => this.successdelete(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
   
  deletedId=this.id
  statusData: string;
  openVerticallyCentered(poup, dataValue) {
    this.modalService.open(poup, { centered: true });
    
    this.statusData = dataValue.status;
  }
  yesStatus() {
    console.log(this.status)
    if (this.status == 'Active') {
      this.status = "Inactive";
    } else {
      this.status= "Active";
    }
    this.modalService.dismissAll();
    this.api
      .putReqAuth("admin/user/status", { id: this.id, status: this.status})
      .subscribe(
        res => this.successStatus(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  errorMessage:string = "";
  successMessage:string = "";
  successStatus(res) {
    if (res.status == true) {
      this._api.showNotification( 'success', res.message );
      this.viewUser();
      // this.ngOnInit()
    } else {
      this._api.showNotification( 'error', res.message );
   
    }
 

  }
  successdelete(res) {
    if (res.status == true) {
      this._api.showNotification( 'success', res.message );
      this.router.navigate(['/theme/users'])
    } else {
     
      this._api.showNotification( 'error', res.message );
    }


  }


  viewUser() {
    this.spinner.show();
    this.api
      .getReqAuth("admin/user/detail?id=" + this.id)
      .subscribe(
        res => this.successView(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
data:any={};
  successView(res) {
    if (res.status == true) {
      this.spinner.hide()
      this.data = res.result;
      console.log(this.data)
      this.collection=this.data.order_list
      console.log(this.collection)
      console.log('length',this.collection.length)

    }
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    //  this.addProperty.get('beds').patchValue(property['bed']);

  }

  error(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this._api.showNotification( 'error', res.message );
  }

}