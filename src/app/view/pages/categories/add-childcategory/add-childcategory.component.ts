import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-add-childcategory",
  templateUrl: "./add-childcategory.component.html",
  styleUrls: ["./add-childcategory.component.css"]
})
export class AddChildcategoryComponent implements OnInit {

 
  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  url1='';url:string='';
  message:string='';
  keyValue:boolean=false;
  constructor(
    private _fb: FormBuilder,
    private _util: CommonUtil,
    private api:HttpService,
    private _route:ActivatedRoute,
    private spinner:NgxSpinnerService,
    private router: Router) {


  }
  FORM_ERROR = {
    name: {
      required: ERROR_MESSAGES.NAME_ENGLISH_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_MAX_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    descriptionen: {
      required: ERROR_MESSAGES.DESCRIPTION_ENGLISH_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_NAME_LENGTH}`,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    namear: {
      required: ERROR_MESSAGES.NAME_ARABIC_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_MAX_LENGTH}`,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    descriptionar: {
      required: ERROR_MESSAGES.DESCRIPTION_ARABIC_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_NAME_LENGTH}`,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    statusKey: {
      required: ERROR_MESSAGES.STATUS_REQUIRED
    }
  };

  createForm() {
    this.loginForm = this._fb.group({
      name_pe: [this.data.name],
      name_pa: [this.data.name_ar],
      name: ["", [Validators.required,Validators.pattern(Regex.spacesDatas),Validators.maxLength(CONFIG.NAME_MAX_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
     descriptionen: ["", [Validators.required, Validators.pattern(Regex.description),Validators.maxLength(CONFIG.DESCRIPTION_NAME_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
      namear: ["", [Validators.required,Validators.pattern(Regex.spacesDatas),Validators.maxLength(CONFIG.NAME_MAX_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
      descriptionar: ["", [Validators.required,Validators.pattern(Regex.description),Validators.maxLength(CONFIG.DESCRIPTION_NAME_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
   
      statusKey: ["", [Validators.required]]
    });
  }
  ngOnInit() {
    this._route.params.subscribe(param => {
      if (param && param["parent_id"]) {
        this.id=param["parent_id"];
        this.viewCate();

      }
      if (param && param["id"]) {
        this.sub_id=param["id"];
        this.viewCate();
        this.viewSubCate();
      }
      })
    this.createForm();
  }
  get name_pe(): FormControl {
    return this.loginForm.get("name_pe") as FormControl;
  }
  get name_pa(): FormControl {
    return this.loginForm.get("name_pa") as FormControl;
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
   this.keyValue=true;
    if (event.target.files && event.target.files[0]) {
      var mimeType = event.target.files[0].type;
      var file = event.target.files[0];
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      // let reader = new FileReader();
      // reader.readAsDataURL(event.target.files[0]); // read file as data url
      // reader.onload = (event: any) => { // called once readAsDataURL is completed
      //   this.url = event.result;
      // }
     

        this.url1 = event.target.files[0];
        console.log(this.url1)

    
      setTimeout(()=>{
        this.loader = false;
        this.keyValue=false;
        },3000)
      this.loader = true;

    }
  }
  success(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    if(res.status==true){
      this.router.navigate(['theme/categories/subcategories/childcategories',{id:this.data.id}])
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
  submit() {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {

      this.spinner.show();

      const formData = new FormData();
      formData.append('category_image', this.url1);
      formData.append('name', this.loginForm.value.name);
     formData.append('description', this.loginForm.value.descriptionen);
      formData.append('name_ar', this.loginForm.value.namear);
      formData.append('description_ar', this.loginForm.value.descriptionar);
      formData.append('status', this.loginForm.value.statusKey);
      formData.append('parent_id', this.data.id);
      console.log(formData)
      this.api
      .postReqAuth2("admin/category/add",formData).subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  } else{
    this._util.markError(this.loginForm);
}

  }
  rtl(element) {
    if (element.setSelectionRange) {
      element.setSelectionRange(0, 0);
    }
  }

 
  update() {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {

      this.spinner.show();

      const formData = new FormData();
      formData.append('id', this.sub_id);
      formData.append('parent_id', this.id);
      formData.append('category_image', this.url1);
      formData.append('name', this.loginForm.value.name);
     formData.append('description', this.loginForm.value.descriptionen);
      formData.append('name_ar', this.loginForm.value.namear);
      formData.append('description_ar', this.loginForm.value.descriptionar);
      formData.append('status', this.loginForm.value.statusKey);
      console.log(formData)
      this.api
      .putReqAuth("admin/category/edit",formData).subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  } else{
    this._util.markError(this.loginForm);
}
}
id:string=null;
sub_id:string=null;
viewSubCate(){
  this.api
  .getReqAuth("admin/category/detail?id="+this.sub_id)
  .subscribe(
    res => this.successViewSub(res),
    err => this.error(err),
    () => (this.loader = false)
  );
}
  viewCate(){
    this.api
    .getReqAuth("admin/category/detail?id="+this.id)
    .subscribe(
      res => this.successView(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }
  data:any={};
  successView(res){
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    if(res.status==true){
    this.data= res.result;
    this.loginForm.get('name_pe').patchValue(this.data.name);
    this.loginForm.get('name_pa').patchValue(this.data.name_ar);
  
    }
  }
  successViewSub(res){
    if(res.status==true){
      var data= res.result;
    this.loginForm.get('name').patchValue(data.name);
    this.loginForm.get('namear').patchValue(data.name_ar);
    this.loginForm.get('descriptionen').patchValue(data.description);
    this.loginForm.get('descriptionar').patchValue(data.description_ar);
    this.loginForm.get('statusKey').patchValue(data.status);
    this.url=data.category_image;
    }
  }
  //  this.addProperty.get('beds').patchValue(property['bed']);

}