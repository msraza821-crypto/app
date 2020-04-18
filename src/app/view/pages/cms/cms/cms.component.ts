import { Component, OnInit, ViewChild, HostBinding } from "@angular/core";
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Router, ActivatedRoute, Route } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: "app-cms",
  templateUrl: "./cms.component.html",
  styleUrls: ["./cms.component.css"]
})
export class CmsComponent implements OnInit {
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
    private api: HttpService,
    private _fb: FormBuilder,private spinner:NgxSpinnerService,
    private store: Store<any>,
  ) {
  }
  start = "";
  end = "";
  ngOnInit(): void {
    this.createForm();
    this.loadcms();

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
  loadcms() {
    var start1 = '';
    var end1 = '';
    //  console.log(this.loginForm.value)
  this.spinner.show();
     var url="admin/cms/list?page="+this.page+"&limit="+this.limit;
    this.api
      .getReqAuth(url)
      .subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
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
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  onScroll() {
    const currentDataLength = this.page * this.limit;
    console.log(currentDataLength, this.totalRec);
    this.loadcms();
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
  }
  filter() {
    console.log(this.loginForm.value)
    this.loadcms();
  }
  yes() {
    this.modalService.dismissAll();
    //var formData=new FormData();
    //   formData.append('id',this.deletedId)
    this.api
      .putReqAuth("admin/cms/delete", { id: this.deletedId }).subscribe(
        res => this.successdelete(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  successdelete(res) {
    this.ngOnInit();
  }
  yesStatus() {
    if (this.statusData == 'Active') {
      this.statusData = "Inactive";
    } else {
      this.statusData = "Active";
    }
    this.modalService.dismissAll();
    this.api
      .putReqAuth("admin/cms/status", { id: this.deletedId, status: this.statusData })
      .subscribe(
        res => this.successStatus(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  successStatus(res) {
    if (res.status == true) {
      this.ngOnInit();
    }
  }
}
