import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService,AppService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private _api:AppService
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


  successView(res){
    this.spinner.hide();
    console.log(res)
    this.data=res.result;
    this.yes=true;

  }

  error(res) {
    setTimeout(() => {     
      this.spinner.hide();
    }, 1000);
    this._api.showNotification( 'error', res.message );
    
  }

}
