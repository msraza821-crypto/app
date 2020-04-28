import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormArray,FormBuilder,Validators} from  "@angular/forms";
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private _util: CommonUtil,
    private api:HttpService,
    private modalService: NgbModal,
    private spinner:NgxSpinnerService,
    private route:ActivatedRoute,
    private router:Router) { }
id;
  ngOnInit() {
    this.route.params.subscribe(param=>
      {
        if(param && param['id'])
        {
  
  this.id=param.id
  console.log(this.id)
  this.viewBanner()
        }
      })
  }
  viewBanner(){
    this.spinner.show();
    this.api
    .getReqAuth("admin/banner/banner-detail?id="+this.id)
    .subscribe(
      res => this.successView(res),
      err => this.error(err),
     
    );
  }
  url;
  data:any={};
  successView(res){
    this.spinner.hide();
    if(res.status==true){
    this.data= res.result;   
    
    this.url=this.data.image;
    }
  }
  error(res){
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this._util.markError(res.message);
  }
  openVerticallyCentered(poup, data) {
    this.modalService.open(poup, { centered: true });

    this.url=this.data.image;
   // alert(this.url)
  }
}
