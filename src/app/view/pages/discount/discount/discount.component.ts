import { Component, OnInit, ViewChild, HostBinding } from "@angular/core";
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Router, ActivatedRoute, Route } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService, AppService } from 'src/app/service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';

@Component({
  selector: "app-discount",
  templateUrl: "./discount.component.html",
  styleUrls: ["./discount.component.css"]
})
export class DiscountComponent implements OnInit {
  collection = [];
  // pager object
  pager: any = {};
  loginForm: FormGroup;
  data: any = {};
  CONFIG=CONFIG;
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
    private api: HttpService,
    private spinner: NgxSpinnerService,
    private _fb: FormBuilder,
    private _api:AppService,
    private store: Store<any>,
  ) {
  }
  start = "";
  end = "";
  ngOnInit(): void {
    this.createForm();
    this.loadBrands();

  }
  filterSelected(selectedValue) {
    console.log('selected value= ' + selectedValue)
    this.limit = selectedValue;
    this.loadBrands();

  }
  filterSelectedStatus(selectedValue) {
    console.log('selected value= ' + selectedValue)
    this.loginForm.get('status').patchValue(selectedValue)
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
    this.exportData = 1;
    var start1 = '';
    var end1 = '';
    //  console.log(this.loginForm.value)
    if (this.loginForm.value.range) {
      start1 = this.loginForm.value.range.startDate._d;
      var startDate = new Date(start1)
      start1 = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
      end1 = this.loginForm.value.range.endDate._d;
      var endDate = new Date(end1)
      end1 = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
    }
    var url = "admin/discount/list?search_string=" + this.loginForm.value.search + "&status=" + this.loginForm.value.status + "&start_date=" + start1 + "&end_date=" + end1 + "&page=" + this.page + "&limit=" + this.limit + "&isExport=1";
    this.api.getReqAuthExport(url).subscribe(
      res => this.downloadFile(res),
      err => this.error(err), () => (this.loader = false)
    );
  }


  downloadFile(data: File) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, 'Category.csv');
    } else {
      let a = document.createElement('a');
      a.href = url;
      a.download = 'products.csv';
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
    this.spinner.show();
    //  console.log(this.loginForm.value)
    if (this.loginForm.value.range) {
      start1 = this.loginForm.value.range.startDate._d;
      var startDate = new Date(start1)
      start1 = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
      end1 = this.loginForm.value.range.endDate._d;
      var endDate = new Date(end1)
      end1 = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
    }
    var url = "admin/discount/list?search_string=" + this.loginForm.value.search + "&status=" + this.loginForm.value.status + "&start_date=" + start1 + "&end_date=" + end1 + "&page=" + this.page + "&limit=" + this.limit + "&isExport=" + this.exportData;
    this.api
      .getReqAuth(url)
      .subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  
  add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
      // you can also use substr instead of substring
      string = string.substring(0, limit) + dots;
    }

    return string;
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
  successMessage: string;
  errorMessage: string;
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
      .putReqAuth("admin/discount/change-status", { status: 'trashed', id: this.deletedId }).subscribe(
        res => this.successdelete(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }

  yesStatus() {
    if (this.statusData == 'active') {
      this.statusData = "inactive";
    } else {
      this.statusData = "active";
    }
    this.modalService.dismissAll();
    this.api
      .putReqAuth("admin/discount/change-status", { id: this.deletedId, status: this.statusData })
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
