import { Component, OnInit } from '@angular/core';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Router, ActivatedRoute, Route } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService ,AppService} from 'src/app/service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

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
    private spinner:NgxSpinnerService,
    private api: HttpService,
    private _fb: FormBuilder,
    private store: Store<any>,
    private _api:AppService
  ) {

    this.createForm();
  }
  start = "";
  end = "";
  ngOnInit(): void {
    
    this.loadBanners();

  }

  createForm() {
    this.loginForm = this._fb.group({
      search: [""],
      status: [""],
      range: [""]
    });
    this.loginForm.get('status').patchValue('active')
  }
 
  defaultValue() {
    this.selected = '';
  }
  // exportDataF() {
  //   this.exportData = 1;
  //   var start1 = '';
  //   var end1 = '';
  //   //  console.log(this.loginForm.value)
  //    if(this.loginForm.value.range){
  //      start1=this.loginForm.value.range.startDate._d;
  //      var startDate=new Date(start1)
  //       start1 =startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
  //      end1=this.loginForm.value.range.endDate._d;
  //      var endDate=new Date(end1)
  //      end1 =endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate();
  //     }
  //    var url="admin/banner/banner-list?status="+this.loginForm.value.status+"&start_date="+start1+"&end_date="+end1+"&page="+this.page+"&limit="+this.limit+"&banner_type=1";
  //   this.api
  //     .getReqAuth(url)
  //     .subscribe(
  //       res => this.successFile(res),
  //       err => this.error(err),
  //       () => (this.loader = false)
  //     );
  // }
  
  successFile(csv){
    // var hiddenElement = document.createElement('a');
    // hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    // hiddenElement.target = '_blank';
    // hiddenElement.download = 'people.csv';
    // hiddenElement.click();
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
  // download_csv() {
  //   var data = [
  //     ['Foo', 'programmer'],
  //     ['Bar', 'bus driver'],
  //     ['Moo', 'Reindeer Hunter']
  //  ];
  //   var csv = 'Name,Title\n';
  //   data.forEach(function(row) {
  //           csv += row.join(',');
  //           csv += "\n";
  //   });
  
  //   console.log(csv);
  //   var hiddenElement = document.createElement('a');
  //   hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  //   hiddenElement.target = '_blank';
  //   hiddenElement.download = 'people.csv';
  //   hiddenElement.click();
  // }

//   convertArrayOfObjectsToCSV(args) {
//     var result, ctr, keys, columnDelimiter, lineDelimiter, data;

//     data = args.data || null;
//     if (data == null || !data.length) {
//         return null;
//     }

//     columnDelimiter = args.columnDelimiter || ',';
//     lineDelimiter = args.lineDelimiter || '\n';

//     keys = Object.keys(data[0]);

//     result = '';
//     result += keys.join(columnDelimiter);
//     result += lineDelimiter;

//     data.forEach(function(item) {
//         ctr = 0;
//         keys.forEach(function(key) {
//             if (ctr > 0) result += columnDelimiter;

//             result += item[key];
//             ctr++;
//         });
//         result += lineDelimiter;
//     });

//     return result;
// }
Mystatus='active'
  loadBanners() {
    this.spinner.show();
    var start1 = '';
    var end1 = '';
    //  console.log(this.loginForm.value)
     if(this.loginForm.value.range){
       start1=this.loginForm.value.range.startDate._d;
       var startDate=new Date(start1)
        start1 =startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
       end1=this.loginForm.value.range.endDate._d;
       var endDate=new Date(end1)
       end1 =endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate();
      }
      var url="admin/driver/list?status="+this.loginForm.value.status+"&start_date="+start1+"&end_date="+end1+"&page="+this.page+"&limit="+this.limit+"&search_string="+this.loginForm.value.search;
      this.api
      .getReqAuth(url)
      .subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  success(res) {
    if (res.status == true) {
      console.log(res)
      this.spinner.hide();
      this.collection = res.result.data;
      this.totalRec = res.result.globalCount;
      this.page=this.page;
      this.limit=this.limit;
    }

  }
  error(err) {

  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  filterSelected(selectedValue) {
    console.log('selected value= ' + selectedValue)
    this.limit = selectedValue;
    this.loadBanners();

  }
  onScroll() {
    const currentDataLength = this.page * this.limit;
    console.log(currentDataLength, this.totalRec);
    this.loadBanners();
  }
  //initializing p to one
  p: number = 1;
  deletedId: string;
  statusData: string="active";
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
    this.loadBanners();
  }
  filter() {
    console.log(this.loginForm.value)
    this.loadBanners();
  }
  yes() {
    this.modalService.dismissAll();
    //var formData=new FormData();
    //   formData.append('id',this.deletedId)
    this.api
      .putReqAuth("admin/driver/change-status", { id: this.deletedId , status: 'trashed'}).subscribe(
        res => this.successdelete(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }

  yesActive() {
   
    this.modalService.dismissAll();
    this.api
      .putReqAuth("admin/driver/change-status", { id: this.deletedId, status:'active' })
      .subscribe(
        res => this.successStatus(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  yesInactive() {
   
    this.modalService.dismissAll();
    this.api
      .putReqAuth("admin/driver/change-status", { id: this.deletedId, status:'inactive' })
      .subscribe(
        res => this.successStatus(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  successMessage:string="";
  errorMessage:string="";
  successStatus(res) {
    if (res.status == true) {
      this._api.showNotification( 'success', res.message );  
      this.ngOnInit();
    } else {
      this._api.showNotification( 'error', res.message );  
      
   
    }
    setTimeout(() => {
      this.errorMessage = "";
      this.successMessage = "";
    }, 3000);

  }
  successdelete(res) {
    if (res.status == true) {
      this._api.showNotification( 'error', res.message );
      this.page = 1;
      this.ngOnInit();
    } else {
      this.errorMessage = res.message;
    
    }
    setTimeout(() => {
      this.errorMessage = "";
      this.successMessage = "";
    }, 3000);

  }

}
