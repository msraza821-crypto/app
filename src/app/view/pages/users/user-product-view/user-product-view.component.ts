import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { rangeValidator } from 'src/app/validators/range.validator';

@Component({
  selector: 'app-user-product-view',
  templateUrl: './user-product-view.component.html',
  styleUrls: ['./user-product-view.component.scss']
})
export class UserProductViewComponent implements OnInit {

 
  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  url1 = ''; url: string = '';
  message: string = '';
  keyValue: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _util: CommonUtil,
    private api:HttpService,
    private spinner:NgxSpinnerService,
    private _route:ActivatedRoute,
    private router: Router) {
  }
  categories: any = [];
  subcategories: any = [];
  childcategories: any = [];
  successCategorySub(res) {
    if (res.status) {
      this.subcategories = res.result;
    }
  }
  successCategoryChild(res) {
    if (res.status) {
      this.childcategories = res.result;
    }
  }
  
  sub_cate(event) {
    const value = event;
    this.api
      .getReqAuth("admin/product/category-list?parent_id=" + value).subscribe(
        res => this.successCategorySub(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  child_cate(event) {
    const value = event;
    this.api
      .getReqAuth("admin/product/category-list?parent_id=" + value).subscribe(
        res => this.successCategoryChild(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
id:string=null;
  ngOnInit() {
    this.productSize();
    this.productSiz();
    this.productCategory();
    this._route.params.subscribe(param => {
      if (param && param["id"]) {
        this.id=param["id"];
        this.viewBrand();
      }
      })
  
  }
  productSiz() {
    this.api
      .getReqAuth("admin/product/product-size").subscribe(
        res => this.successSiz(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  sizes: any = [];
  successSiz(res: any) {
    if (res.status) {
      // console.log(res)
      this.sizes = res.result;
    }
  }

  productCategory() {
    this.api
      .getReqAuth("admin/product/category-list?parent_id=0").subscribe(
        res => this.successCategory(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  successCategory(res) {
    if (res.status) {
      // console.log(res)
      this.categories = res.result;
    }
  }


  productSize() {
    this.api
      .getReqAuth("admin/product/brand-list").subscribe(
        res => this.successBrand(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  brands: any = [];
  successBrand(res: any) {
    if (res.status) {
      // console.log(res)
      this.brands = res.result;
    }
  }
  viewBrand(){
    this.spinner.show();
    this.api
    .getReqAuth("admin/product/product-detail?id="+this.id)
    .subscribe(
      res => this.successView(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }
data:any={};
  successView(res){
    if(res.status==true){
    this.data= res.result;
  
    }
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
   
  //  this.addProperty.get('beds').patchValue(property['bed']);

  }
  
  error(res){
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this._util.markError(res.message);
  }

}
