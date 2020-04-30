import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';

@Component({
  selector: "app-add-faq",
  templateUrl: "./add-faq.component.html",
  styleUrls: ["./add-faq.component.css"]
})
export class AddFaqComponent implements OnInit {

 
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
    private _util: CommonUtil,
    private _api:AppService,
    private router: Router) {


  }
  FORM_ERROR = {
    name: {
      required: ERROR_MESSAGES.QUESTION_REQURIED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_NAME_LENGTH}`,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    descriptions: {
      required: ERROR_MESSAGES.ANSWER_REQURIED,
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
      name: ["", [Validators.required,Validators.maxLength(CONFIG.DESCRIPTION_NAME_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.pattern(Regex.spaces)]],
      descriptions: ["", [Validators.required, Validators.pattern(Regex.spaces),Validators.maxLength(CONFIG.DESCRIPTION_NAME_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
      statusKey: ["", [Validators.required]]
    });
  }
  successMessage: string;
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

  errorMessage:string;

  imageFormats: Array<string> = ['jpeg','png','jpg'];
  choosefile: string = "No file chosen...";
  onSelectFile(event) {
    this.keyValue = true;
    if (event.target.files && event.target.files[0]) {
      var mimeType = event.target.files[0].type;
      var file = event.target.files[0];

      this.choosefile=event.target.files[0].name;
      const width = file.naturalWidth;
      const height = file.naturalHeight;

      window.URL.revokeObjectURL( file.src );
    //  var checkimg = file.toLowerCase();
      const type = file.type.split('/');
    if (type[0] === 'image' && this.imageFormats.includes(type[1].toLowerCase())) {

    }else{
      this.errorMessage = "Please use proper format of image like jpeg,jpg and png only.";
      return false;
    } 
    
     
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
   // this.url = event.result;
   this.url = event.target.result;
      }


      this.url1 = event.target.files[0];
      console.log(this.url1)


      setTimeout(() => {
        this.loader = false;
        this.keyValue = false;
        this.errorMessage="";
      }, 3000)
      this.loader = true;

    }
  }
  viewBrand(){
    this.api
    .getReqAuth("admin/faqs/detail?id="+this.id)
    .subscribe(
      res => this.successView(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }

  successView(res){
    if(res.status==true){
    var data= res.result;
    this.loginForm.get('name').patchValue(data.question);
    this.loginForm.get('descriptions').patchValue(data.answer);

    this.loginForm.get('statusKey').patchValue(data.status);
    }
   
  //  this.addProperty.get('beds').patchValue(property['bed']);

  }
  update() {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {

      this.loader = true;

      this.api
      .putReqAuth("admin/faqs/edit",{'id':this.id,'status':this.loginForm.value.statusKey,'question':this.loginForm.value.name.trim(),'answer':this.loginForm.value.descriptions.trim()}).subscribe(
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
      this.loader = true;
      this.api
      .postReqAuth("admin/faqs/add",{'status':this.loginForm.value.statusKey,'question':this.loginForm.value.name.trim(),'answer':this.loginForm.value.descriptions.trim()}).subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }else{
    this._util.markError(this.loginForm);
  }
}
  success(res) {
    if(res.status==true){
      this._api.showNotification( 'success', res.message );
        this.router.navigate(['theme/faqs'])
    
     
  } else {
    this._api.showNotification( 'error', res.message );
    this._util.markError(this.loginForm);
  }

  }
  error(res){
    this._api.showNotification( 'error', res.message );
  }
  
}