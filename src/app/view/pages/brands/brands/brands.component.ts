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
import {DateFormatPipe} from 'src/app/pipes/date-format.pipe';

@Component({
  selector: "app-brands",
  templateUrl: "./brands.component.html",
  styleUrls: ["./brands.component.css"]
})
export class BrandsComponent implements OnInit {
  collection = [];
  // pager object
  pager: any = {};
  loginForm: FormGroup;
  data: any = {};
  CONFIG=CONFIG;
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
  }
  start = "";
  end = "";
  ngOnInit(): void {
    this.createForm();
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
 
  get search(): FormControl {
    return this.loginForm.get("search") as FormControl;
  }
  get status(): FormControl {
    return this.loginForm.get("status") as FormControl;
  }
  get range(): FormControl {
    return this.loginForm.get("range") as FormControl;
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
  loadBrands() {
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
     var url="admin/brand/list?search="+this.loginForm.value.search+"&status="+this.loginForm.value.status+"&fromDate="+start1+"&toDate="+end1+"&page="+this.page+"&limit="+this.limit+"&isExport=0";
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
  filterSelected(selectedValue) {
    console.log('selected value= ' + selectedValue)
    this.limit = selectedValue;
    this.loadBrands();

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
      .putReqAuth("admin/brand/delete", { id: this.deletedId }).subscribe(
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
      .putReqAuth("admin/brand/status", { id: this.deletedId, status: this.statusData })
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
}
