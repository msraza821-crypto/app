import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService,AppService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder,FormControl ,FormGroup} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private api:HttpService,
    private spinner:NgxSpinnerService,
    private _api:AppService,
    private _fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  yes=false;

  id='';
  loader=false;
  data;
  ngOnInit() {
    this.route.params.subscribe(param=>
      {
        if(param && param['id'])
        {
  
  this.id=param.id
  console.log(this.id)
  this.loadDriverDetails()

  
        }
      })
     
  }
  loginFormDriver:FormGroup;
  createFormDriver() {
    this.loginFormDriver = this._fb.group({
      search_string: [""],
   
    });
  }
  
  get search_string(): FormControl {
    return this.loginFormDriver.get("search_string") as FormControl;
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
  successStatus(res) {
    this.spinner.hide();
    if (res.status == true) {
      this.modalService.dismissAll();
      this._api.showNotification( 'success', res.message );
      this.ngOnInit();
    } else {
      this._api.showNotification( 'error', res.message );
   
    }
  

  }
  searchDriver(value){
    
    this.driverlist();
  }
  private debounce: number = 400;
  driverlist() {
    this.loginFormDriver.get('search_string').valueChanges
    .pipe(debounceTime(this.debounce), distinctUntilChanged())
    .subscribe(query => {
      console.log(query);
    });
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
  
  loadDriverDetails()

  {
    this.spinner.show();
  // console.log('vieew')
  this.api
  .getReqAuth("admin/driver/detail?id="+this.id)
  .subscribe(
    res => this.successView(res),
    err => this.error(err),
    () => (this.loader = false)
  );
  }
  deletedId:any;
  openVerticallyCenteredDriver(poup, data) {
    this.createFormDriver();
    this.modalService.open(poup, { centered: true });
    this.deletedId = data.id;
  this.driverlist();
 
  }
  collection:any=[];
  successView(res){
    this.spinner.hide();
    console.log(res)
    this.data=res.result.driver_detail;
   this.collection= res.result.driver_orders
    this.yes=true;

  }

  error(res) {
    setTimeout(() => {     
      this.spinner.hide();
    }, 1000);
    this._api.showNotification( 'error', res.message );
    
  }

}
