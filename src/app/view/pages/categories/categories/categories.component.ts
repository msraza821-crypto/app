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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
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
    private spinner:NgxSpinnerService,
    private store: Store<any>,
  ) {
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
  ngOnInit(): void {


    this.createForm();
    this.loadCats();
  }

  createForm() {
    this.loginForm = this._fb.group({
      name: [""],
      status:[""]
    });
  }
  get status(): FormControl {
    return this.loginForm.get("status") as FormControl;
  }
  limit: number = 10;
  loader: boolean = false;
  loadCats() {
    this.spinner.show();
    var search = this.loginForm.value.name;
    this.api
      .getReqAuth("admin/category/list?search=" + search +"&status="+this.loginForm.value.status+ "&limit=" + this.limit + "&page=" + this.page+'&parent_id=0')
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
    this.loadCats();
  }

  //initializing p to one
  p: number = 1;
  pageChanged(event) {
    console.log("pageChanged")
  }
  url:string;
  showModal: boolean=true;
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  openVerticallyCentered(poup, data) {
    this.modalService.open(poup, { centered: true });
    this.deletedId = data.id;
    this.statusData = data.status;
    this.url=data.category_image;
   // alert(this.url)
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
  filterSelected(selectedValue) {
    console.log('selected value= ' + selectedValue)
    this.limit = selectedValue;
    this.loadCats();

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
