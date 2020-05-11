import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-order-view',
  templateUrl: './user-order-view.component.html',
  styleUrls: ['./user-order-view.component.scss']
})
export class UserOrderViewComponent implements OnInit {

  loader = false;
  collection:any=[];
  CONFIG = CONFIG;
  loginForm: FormGroup;
  url1 = ''; url: string = '';
  message: string = '';
  keyValue: boolean = false;
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
        this.viewUser();
      }
    })

  }

  yes() {
    this.modalService.dismissAll();
    //var formData=new FormData();
    //   formData.append('id',this.deletedId)
    this.api
      .putReqAuth("admin/user/delete", { id: this.deletedId }).subscribe(
        res => this.successdelete(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
   
  deletedId: string;
  statusData: string;
  openVerticallyCentered(poup, dataValue) {
    this.modalService.open(poup, { centered: true });
    this.deletedId = dataValue.id;
    this.statusData = dataValue.status;
  }
  yesStatus() {
    console.log(this.statusData)
    if (this.statusData == 'active') {
      this.statusData = "Inactive";
    } else {
      this.statusData = "Active";
    }
    this.modalService.dismissAll();
    this.api
      .putReqAuth("admin/user/status", { id: this.deletedId, status: this.statusData })
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
      this.data = res.result;
    
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