import { Component, OnInit, ViewChild, HostBinding } from "@angular/core";
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Router, ActivatedRoute } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/service';

@Component({
  selector: "app-contactus",
  templateUrl: "./contactus.component.html",
  styleUrls: ["./contactus.component.css"]
})
export class ContactusComponent implements OnInit {
  collection = [];

  // pager object
  pager: any = {};
  data: any = {};
  // paged items
  pagedItems: any[];
  code: any = "";
  loginForm: FormGroup;
  key: string = 'name'; //set default
  reverse: boolean = false;
  title = 'app';
  employees: Array<any>;
  totalRec: number;
  page: number = 1;
  constructor(
    private router: Router,
    public _fb: FormBuilder,
    private api: HttpService,
    private modalService: NgbModal,
    private store: Store<any>,
  ) {

    for (let i = 1; i <= this.limit; i++) {
      this.collection.push(`category ${i}`);
    }
  }
  ngOnInit(): void {


    this.createForm();
    this.loadCats();
  }

  createForm() {
    this.loginForm = this._fb.group({
      name: [""]
    });
  }
  limit: number = 10;
  loader: boolean = false;
  loadCats() {
    var search = this.loginForm.value.name;
    this.api
      .getReqAuth("admin/category/list?search=" + search + "&limit=" + this.limit + "&page=" + this.page)
      .subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  get name(): FormControl {
    return this.loginForm.get("name") as FormControl;
  }
  success(res) {
    if (res.status == true) {
      this.collection = res.result.data;
      this.totalRec = res.result.globelCount;
      // this.page=this.page;
      //this.limit=this.limit;
    }

  }
  error(err) {

  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  onScroll() {
    const currentDataLength = this.page * this.limit;
    console.log(currentDataLength, this.totalRec);
    if (this.totalRec <= currentDataLength) {
      return false;
    }
    this.page++;

    this.loadCats();
  }

  //initializing p to one
  p: number = 1;
  pageChanged(event) {
    console.log("pageChanged")
  }

  openVerticallyCentered(poup, data) {
    this.modalService.open(poup, { centered: true });
    this.deletedId = data.id;
    this.statusData = data.status;
  }
  reset() {
    this.createForm();
    this.loadCats();
  }

  filter() {
    console.log(this.loginForm.value)
    this.loadCats();
  }
  yes() {
    this.modalService.dismissAll();
    this.api
      .putReqAuth("admin/category/delete", { id: this.deletedId }).subscribe(
        res => this.successdelete(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
    successdelete(res) {
    this.page=1;
    this.ngOnInit();
  }
  deletedId: number;
  statusData: string;
  yesStatus() {
    if (this.statusData == 'Active') {
      this.statusData = "Inactive";
    } else {
      this.statusData = "Active";
    }
    this.modalService.dismissAll();
    this.api
      .putReqAuth("admin/category/status", { id: this.deletedId, status: this.statusData })
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
