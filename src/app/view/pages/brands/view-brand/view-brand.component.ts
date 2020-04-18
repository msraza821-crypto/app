import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: "app-view-brand",
  templateUrl: "./view-brand.component.html",
  styleUrls: ["./view-brand.component.css"]
})
export class ViewBrandComponent implements OnInit {


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
  FORM_ERROR = {
    name: {
      required: ERROR_MESSAGES.NAME_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    descriptionen: {
      required: ERROR_MESSAGES.DESCRIPTION_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    namear: {
      required: ERROR_MESSAGES.NAME_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    descriptionar: {
      required: ERROR_MESSAGES.DESCRIPTION_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    statusKey: {
      required: ERROR_MESSAGES.STATUS_REQUIRED
    }
  };

  createForm() {
    this.loginForm = this._fb.group({
      name: [{value:"", disabled: false}, [Validators.required]],
     descriptionen: [{value:"", disabled: false}, [Validators.required, Validators.pattern(Regex.description)]],
      namear: [{value:"", disabled: false}, [Validators.required]],
      descriptionar: [{value:"", disabled: false}, [Validators.required]],
      statusKey: [{value:"", disabled: false}, [Validators.required]]
    });
  }
  rtl(element) {
    if (element.setSelectionRange) {
      element.setSelectionRange(0, 0);
    }
  }
id:string=null;
  ngOnInit() {
    this._route.params.subscribe(param => {
      if (param && param["id"]) {
        this.id=param["id"];
        this.viewBrand();
      }
      })
    this.createForm();
  }
  get name(): FormControl {
    return this.loginForm.get("name") as FormControl;
  }
  get descriptionen(): FormControl {
    return this.loginForm.get("descriptionen") as FormControl;
  }
  get namear(): FormControl {
    return this.loginForm.get("namear") as FormControl;
  }
  get descriptionar(): FormControl {
    return this.loginForm.get("descriptionar") as FormControl;
  }
  get statusKey(): FormControl {
    return this.loginForm.get("statusKey") as FormControl;
  }


  onSelectFile(event) {
    this.keyValue = true;
    if (event.target.files && event.target.files[0]) {
      var mimeType = event.target.files[0].type;
      var file = event.target.files[0];
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.result;
      }


      this.url1 = event.target.files[0];
      console.log(this.url1)


      setTimeout(() => {
        this.loader = false;
        this.keyValue = false;
      }, 3000)
      this.loader = true;

    }
  }
  viewBrand(){
    this.spinner.show();
    this.api
    .getReqAuth("admin/brand/detail?id="+this.id)
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
  update() {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {

      this.spinner.show();

      const formData = new FormData();
      formData.append('id', this.id);
      formData.append('brand_image', this.url1);
      formData.append('name', this.loginForm.value.name);
     formData.append('description', this.loginForm.value.descriptionen);
      formData.append('name_ar', this.loginForm.value.namear);
      formData.append('description_ar', this.loginForm.value.descriptionar);
      formData.append('status', this.loginForm.value.statusKey);
      console.log(formData)
      this.api
      .putReqAuth("admin/brand/edit",formData).subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  } else{
    this._util.markError(this.loginForm);
}
}
  submit() {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {

      this.spinner.show();
      const formData = new FormData();
      formData.append('brand_image', '');
      formData.append('name', this.loginForm.value.name);
     formData.append('description', this.loginForm.value.descriptionen);
      formData.append('name_ar', this.loginForm.value.namear);
      formData.append('description_ar', this.loginForm.value.descriptionar);
      formData.append('status', this.loginForm.value.statusKey);
      console.log(formData)
      this.api
      .postReqAuth("admin/brand/add",formData).subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  } else{
    this._util.markError(this.loginForm);
}
}
  success(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    if(res.status==true){
      this.router.navigate(['theme/brands'])
  } else {
    this._util.markError(this.loginForm);
  }

  }
  error(res){
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this._util.markError(res.message);
  }
  
}