import { Component, OnInit, ViewChild, HostBinding } from "@angular/core";
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Router, ActivatedRoute } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HttpService, AppService } from 'src/app/service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DateFormatPipe} from 'src/app/pipes/date-format.pipe';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  collection = [];
  // pager object
  pager: any = {};
  loginForm: FormGroup;
  data: any = {};
  // paged items
  pagedItems: any[];
  code: any = "";
  key: string = 'name'; //set default
  reverse: boolean = false;
  title = 'app';
  employees: Array<any>;
  totalRec: number;
  loader: boolean = false;
  page: number = 1;
  limit: number = 10;
  exportData: number = 0;
  id: number;
  selected: any = {};
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private api: HttpService,
    private _fb: FormBuilder,
    private store: Store<any>,
    private _api:AppService
  ) {
  }
  start = "";
  end = "";
  successMessage: string;
  errorMessage: string;
  ngOnInit(): void {
    this.createForm();
    this.loadBrands();

  }
  filterSelected(selectedValue) {
    console.log('selected value= ' + selectedValue)
    this.limit = selectedValue;
    this.loadBrands();

  }
 
 
  createForm() {
    this.loginForm = this._fb.group({
      search: [""],
      status: [""],
      range: [""]
    });
  }
  defaultValue() {
    this.selected = '';
  }
  exportDataF() {
    var start1 = '';
    var end1 = '';
    //  console.log(this.loginForm.value)
    this.spinner.show();
    if (this.loginForm.value.range) {
      start1 = this.loginForm.value.range.startDate._d;
      var startDate = new Date(start1)
      start1 = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
      end1 = this.loginForm.value.range.endDate._d;
      var endDate = new Date(end1)
      end1 = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
    }
    var url = "admin/user/list?search=" + this.loginForm.value.search + "&status=" + this.loginForm.value.status + "&fromDate=" + start1 + "&toDate=" + end1 + "&page=" + this.page + "&limit=" + this.limit + "&isExport=1";
  
    this.api.getReqAuthExport(url).subscribe(
      res=> this.downloadFile(res),
      err=> this.error(err),()=> (this.loader= false)
    );
  }
  
  add3Dots(string, limit)
  {
    var dots = "...";
    if(string.length > limit)
    {
      // you can also use substr instead of substring
      string = string.substring(0,limit) + dots;
    }
  
      return string;
  }
  downloadFile(data: File) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    const blob= new Blob([data], { type: 'text/csv' });
    const url= window.URL.createObjectURL(blob);
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, 'Category.csv');
    } else {
      let a= document.createElement('a');
      a.href= url;
      a.download= 'users.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }
  get search(): FormControl {
    return this.loginForm.get("search") as FormControl;
  }
  get status(): FormControl {
    return this.loginForm.get("status") as FormControl;
  }
  get range(): FormControl {
    return this.loginForm.get("range") as FormControl;
  }
  loadBrands() {
    var start1 = '';
    var end1 = '';
    //  console.log(this.loginForm.value)
    this.spinner.show();
    if (this.loginForm.value.range) {
      start1 = this.loginForm.value.range.startDate._d;
      var startDate = new Date(start1)
      start1 = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
      end1 = this.loginForm.value.range.endDate._d;
      var endDate = new Date(end1)
      end1 = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
    }
    var url = "admin/user/list?search=" + this.loginForm.value.search + "&status=" + this.loginForm.value.status + "&fromDate=" + start1 + "&toDate=" + end1 + "&page=" + this.page + "&limit=" + this.limit + "&isExport=0";
    this.api
      .getReqAuth(url)
      .subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  absoluteIndex(indexOnPage: number): number {
    return this.limit * (this.page - 1) + indexOnPage;
  }
  success(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    if (res.status == true) {
      this.collection = res.result.data;
      this.totalRec = res.result.globelCount;
      // this.page=this.page;
      //this.limit=this.limit;
    }

  }
  error(err) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
 this._api.showNotification( 'error', err );
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  onScroll() {
    const currentDataLength = this.page * this.limit;
    console.log(currentDataLength, this.totalRec);
    this.loadBrands();
  }
  //initializing p to one
  p: number = 1;
  deletedId: string;
  statusData: string;
  pageChanged(event) {
    console.log("pageChanged")
  }
  openVerticallyCentered(poup, data) {
    this.modalService.open(poup, { centered: true });
    this.deletedId = data.id;
    this.statusData = data.status;
  }
  choosedDate(event) {
    console.log(event)
  }
  reset() {
    this.createForm();
    this.selected = {};
    this.exportData = 0;
    this.start = "";
    this.end = "";
    this.loadBrands();
  }
  filter() {
    console.log(this.loginForm.value)
    this.loadBrands();
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

  yesStatus() {
    if (this.statusData == 'Active') {
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
  successStatus(res) {
    if (res.status == true) {
     
      this._api.showNotification( 'success', res.message );
      this.ngOnInit();
    } else {
      this._api.showNotification( 'error', res.message );
   
    }   

  }
  successdelete(res) {
    if (res.status == true) {
      this._api.showNotification( 'success', res.message );
      this.page = 1;
      this.ngOnInit();
    } else {
      this._api.showNotification( 'error', res.message );
    
    }


  }
}
