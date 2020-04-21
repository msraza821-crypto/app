import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: "app-add-cms",
  templateUrl: "./add-cms.component.html",
  styleUrls: ["./add-cms.component.css"]
})
export class AddCmsComponent implements OnInit {

 
  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  url1='';url:string='';
  message:string='';
  keyValue:boolean=false;
  constructor(
    private _fb: FormBuilder,
    public _route:ActivatedRoute,
    private api:HttpService,
    private _util: CommonUtil,private spinner:NgxSpinnerService,
    private router: Router) {


  }
  FORM_ERROR = {
    name: {
      required: ERROR_MESSAGES.NAME_ENGLISH_REQUIREDCMS,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_LENGTH_TITLE}`,
      minlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    descriptions: {
      required: ERROR_MESSAGES.DESCRIPTION_ENGLISH_REQUIREDCMS,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      minlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    statusKey: {
      required: ERROR_MESSAGES.STATUS_REQUIRED
    }
  };

  createForm() {
    this.loginForm = this._fb.group({
      name: ["", [Validators.required, Validators.pattern(Regex.spacesDatas),Validators.maxLength(CONFIG.NAME_LENGTH_TITLE),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
      descriptions: ["", [Validators.required, Validators.pattern(Regex.description),Validators.maxLength(CONFIG.DESCRIPTION_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
      statusKey: ["", [Validators.required]]
    });
  }

  get name(): FormControl {
    return this.loginForm.get("name") as FormControl;
  }
  get descriptions(): FormControl {
    return this.loginForm.get("descriptions") as FormControl;
  }
  get statusKey(): FormControl {
    return this.loginForm.get("statusKey") as FormControl;
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
    .getReqAuth("admin/cms/detail?id="+this.id)
    .subscribe(
      res => this.successView(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }

  successView(res){
    if(res.status==true){
    var data= res.result;
    this.loginForm.get('name').patchValue(data.content_title);
    this.loginForm.get('descriptions').patchValue(data.content_description);

    this.loginForm.get('statusKey').patchValue(data.status);
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
      formData.append('content_title', this.loginForm.value.name);
     formData.append('content_description', this.loginForm.value.descriptions);   
      formData.append('status', this.loginForm.value.statusKey);
      console.log(formData)
      this.api
      .putReqAuth("admin/cms/edit",formData).subscribe(
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
     formData.append('content_title', this.loginForm.value.name);
     formData.append('content_description', this.loginForm.value.descriptions);

      console.log(formData)
      this.api
      .postReqAuth("admin/cms/add",formData).subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }else{
    this._util.markError(this.loginForm);
  }
}
  success(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    if(res.status==true){
      this.router.navigate(['theme/cms'])
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