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
import { ERROR_MESSAGES } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
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
    private _api:AppService,
    private _util: CommonUtil
  ) {
  }
  FORM_ERROR = {
    reason: {
      required: ERROR_MESSAGES.REASON_REQUIRED
    },
  }
  start = "";
  end = "";
  ngOnInit(): void {
    this.createForm();
    this.createFormReason();
    this.loadOrders();
this.rejectReasons();

  }
  transform(str:string): string{
    let arr;
    let day
    let mm=''
   let  month=[{name:'January,', number:'01'},
      {name:'February,',number:'02'}, 
      {name:'March,',number:'03'} ,
      {name:'April,',number:'04'}, 
      {name:'May,',number:'05'}, 
     {name:'June,',number:'06'}, 
      {name:'July,',number:'07'}, 
      {name:'August,',number:'08'}, 
      {name:'September,',number:'09'}, 
      {name:'October,',number:'10'}, 
      {name:'November,',number:'11'} ,
      {name:'December,',number:'12'} 
      
    ];
    arr= str.split(' ')
    day=arr[0].split('t')
    if(arr[0]=='1st')
    day=arr[0].split('s')
    if(arr[0]=='2nd')
    day=arr[0].split('n')
 
  
   for(let m of month)
   {
     if(arr[1]==m['name'])
     mm=m['number']
   }

  day[0]=Number(day[0])
  if(day[0]<10)
day[0]='0'+day[0]  
    return day[0]+"-"+mm+'-'+arr[2]

  }
  loginFormReason:FormGroup;
  createFormReason() {
    this.loginFormReason = this._fb.group({
      reason: ["",Validators.required],
   
    });
  }
  
  loginFormDriver:FormGroup;
  createFormDriver() {
    this.loginFormDriver = this._fb.group({
      search_string: [""],
   
    });
  }
  createForm() {
    this.loginForm = this._fb.group({
      search: [""],
      status: ["pending"],
      range: [""]
    });
  }
  yesStatusReject(){
    if(this.loginFormReason.valid){
      this.modalService.dismissAll();
    this.api
      .putReqAuth("admin/order/change-status", { id: this.deletedId, status: this.statusData,reason:this.loginFormReason.value.reason })
      .subscribe(
        res => this.successStatus(res),
        err => this.error(err),
        () => (this.loader = false)
      );
    }else{
      this._util.markError(this.loginFormReason);
    }
  }
  defaultValue() {
    this.selected = '';
  }
  successMessage: string;
  errorMessage: string;
  exportDataF() {
    this.exportData = 1;
    var start1 = '';
    var end1 = '';
    this.spinner.show();
    //  console.log(this.loginForm.value)
     if(this.loginForm.value.range){
       start1=this.loginForm.value.range.startDate._d;
       var startDate=new Date(start1)
        start1 =startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
       end1=this.loginForm.value.range.endDate._d;
       var endDate=new Date(end1)
       end1 =endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate();
      }
     var url="admin/brand/list?search="+this.loginForm.value.search+"&status="+this.loginForm.value.status+"&fromDate="+start1+"&toDate="+end1+"&page="+this.page+"&limit="+this.limit+"&isExport=1";
    this.api.getReqAuthExport(url).subscribe(
      res=> this.downloadFile(res),
      err=> this.error(err),()=> (this.loader= false)
    );
  }
  reasons:any=[];
rejectReasons(){
  this.reasons=[{'id':1,reason:'Reason1'},{'id':2,reason:'Reason2'}];
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
      a.download= 'brands.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }
  get reason(): FormControl {
    return this.loginFormReason.get("reason") as FormControl;
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
  get search_string(): FormControl {
    return this.loginFormDriver.get("search_string") as FormControl;
  }
  
  download_csv() {
    var data = [
      ['Foo', 'programmer'],
      ['Bar', 'bus driver'],
      ['Moo', 'Reindeer Hunter']
   ];
    var csv = 'Name,Title\n';
    data.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });
  
    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
  }

  convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}
driverlist() {
  this.spinner.show();
  this.api
    .getReqAuth("admin/driver/available-driver?search_string="+this.loginFormDriver.value.search_string).subscribe(
      res => this.successDriver(res),
      err => this.error(err),
      () => (this.loader = false)
    );
}
drivers: any = [];
successDriver(res: any) {
  this.spinner.hide();
  if (res.status) {
    // console.log(res)
    this.drivers = res.result;
  }
}
changeStatus(selectedValue) {
  this.collection=[];
  //this.status = selectedValue;
  this.loadOrders();

}
  loadOrders() {
    var start1 = '';
    var end1 = '';
    this.spinner.show();
    //  console.log(this.loginForm.value)
     if(this.loginForm.value.range){
       start1=this.loginForm.value.range.startDate._d;
       var startDate=new Date(start1)
        start1 =startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
       end1=this.loginForm.value.range.endDate._d;
       var endDate=new Date(end1)
       end1 =endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate();
      }
     var url="admin/order/order-list?search="+this.loginForm.value.search+"&status="+this.loginForm.value.status+"&fromDate="+start1+"&toDate="+end1+"&page="+this.page+"&limit="+this.limit+"&isExport=0";
    this.api
      .getReqAuth(url)
      .subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  success(res) {
    this.spinner.hide();
    if (res.status == true) {
      this.collection = res.result.data;
      this.totalRec = res.result.globalCount;
      console.log(this.collection)
    
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
  filterSelected(selectedValue) {
    console.log('selected value= ' + selectedValue)
   // this.limit = selectedValue;
    this.loadOrders();

  }

  myStatus="";
  chnageStatus()
  {

    this.myStatus=this.loginForm.value.status
console.log(this.myStatus)  

  }
  assignedDriver(i){
    this.spinner.show();
    this.api
    .postReqAuth("admin/driver/assign-driver", { driver_id: i.id, order_id: this.deletedId })
    .subscribe(
      res => this.successStatus(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }
  searchDriver(value){
    
    this.driverlist();
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
  onScroll() {
    const currentDataLength = this.page * this.limit;
    console.log(currentDataLength, this.totalRec);
    this.loadOrders();
  }
  //initializing p to one
  p: number = 1;
  deletedId: string;
  statusData: string;
  pageChanged(event) {
    console.log("pageChanged")
  }
  openVerticallyCentered(poup, data,status) {
    this.modalService.open(poup, { centered: true });
    this.deletedId = data.id;
    this.statusData=status;
  }
  openVerticallyCenteredDriver(poup, data) {
    this.createFormDriver();
    this.modalService.open(poup, { centered: true });
    this.deletedId = data.id;
  this.driverlist();
 
  }
  choosedDate(event) {
    console.log(event)
  }
  reset() {
  //  this.createForm();
  this.loginForm.get('search').patchValue('')
  this.loginForm.get('range').patchValue('')
    this.selected = {};
    this.exportData = 0;
    this.start = "";
    this.end = "";
    this.loadOrders();
  }
  filter() {
    console.log(this.loginForm.value)

    this.loadOrders();
  }


  markDelivered(id,status){
    this.spinner.show();
    this.statusData=status;
    this.api
      .putReqAuth("admin/order/change-status", { id: id, status: status })
      .subscribe(
        res => this.successStatus(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  yesStatusAccept() {
    this.spinner.show();
    this.modalService.dismissAll();
    this.api
      .putReqAuth("admin/order/change-status", { id: this.deletedId, status: this.statusData })
      .subscribe(
        res => this.successStatus(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  successStatus(res) {
    this.spinner.hide();
    if (res.status == true) {
      this.modalService.dismissAll();
      this.loginForm.get('status').patchValue(this.statusData)
      this._api.showNotification( 'success', res.message );
      this.ngOnInit();
    } else {
      this._api.showNotification( 'error', res.message );
   
    }
  

  }

}
