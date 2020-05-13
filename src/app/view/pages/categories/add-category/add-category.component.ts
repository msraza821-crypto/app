import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.css"]
})
export class AddCategoryComponent implements OnInit {

  imageErrorMessage:any=ERROR_MESSAGES;
  isImageError=false;
  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  url1='';url:string='';
  message:string='';
  isWrongFormat=false;
  keyValue:boolean=false;
  constructor(
    private _fb: FormBuilder,
    private _util: CommonUtil,
    private api:HttpService,
    private _api:AppService,
    private _route:ActivatedRoute,
    private router: Router) {


  }
  FORM_ERROR = {
    name: {
      required: ERROR_MESSAGES.NAME_ENGLISH_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.B_NAME}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.MAX_B}`,
    },
    descriptionen: {
      // required: ERROR_MESSAGES.DESCRIPTION_ENGLISH_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.B_DES}`,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.MAX_B}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    namear: {
      required: ERROR_MESSAGES.NAME_ARABIC_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.B_NAME}`,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.MAX_B}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    descriptionar: {
      // required: ERROR_MESSAGES.DESCRIPTION_ARABIC_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.B_DES}`,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.MAX_B}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    statusKey: {
      required: ERROR_MESSAGES.STATUS_REQUIRED
    }
  };
 
  createForm() {
    this.loginForm = this._fb.group({
      name: ["", [Validators.required,Validators.pattern(Regex.spaces),Validators.maxLength(CONFIG.B_NAME),Validators.minLength(CONFIG.MAX_B)]],
      descriptionen: ["", [Validators.pattern(Regex.spaces),Validators.maxLength(CONFIG.B_DES),Validators.minLength(CONFIG.MAX_B)]],
       namear: ["", [Validators.required,Validators.pattern(Regex.spaces),Validators.maxLength(CONFIG.B_NAME),Validators.minLength(CONFIG.MAX_B)]],
       descriptionar: ["", [Validators.pattern(Regex.spaces),Validators.maxLength(CONFIG.B_DES),Validators.minLength(CONFIG.MAX_B)]], 
      statusKey: ["", [Validators.required]]
    ,is_banner:[this.isRemberMeChecked]
    });
  }
  ngOnInit() {
    this._route.params.subscribe(param => {
      if (param && param["id"]) {
        this.id=param["id"];
        this.viewCate();
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
  get is_banner(): FormControl {
    return this.loginForm.get("is_banner") as FormControl;
  }
  
  isRemberMeChecked:boolean = false;
  imageFormats: Array<string> = ['jpeg','png','jpg'];
  choosefile: string = "No file chosen...";
  onSelectFile(event) {
    this.keyValue = true;
    this.isImageError=false;
    this.isWrongFormat=false;
    if (event.target.files && event.target.files[0]) {
      var mimeType = event.target.files[0].type;
      var file = event.target.files[0];
      this.choosefile=event.target.files[0].name;

      const width = file.naturalWidth;
      const height = file.naturalHeight;

      window.URL.revokeObjectURL(file.src);
      //  var checkimg = file.toLowerCase();
      const type = file.type.split('/');
      if (type[0] === 'image' && this.imageFormats.includes(type[1].toLowerCase())) {

      } else {
        this.errorMessage = "Please use proper format of image like jpeg,jpg and png only.";
        this.choosefile= "No file chosen...";
        this.isWrongFormat=true;
        this.url='';
        this.url1=';'
      

        return false;
      }


      let reader1 = new FileReader();
      reader1.readAsDataURL(event.target.files[0]); // read file as data url
      reader1.onload = (event: any) => { // called once readAsDataURL is completed
       // this.url = event.result;
        this.url = event.target.result;
      }


    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
  
    reader.onload = () => {
    
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const height = img.naturalHeight;
        const width = img.naturalWidth;
        console.log('Width and Height', width, height);
        if ((height <= CONFIG.CATEGORY_MIN_HEIGHT || height >= CONFIG.CATEGORY_MAX_HEIGHT) || (width <= CONFIG.CATEGORY_MIN_WIDTH || width >= CONFIG.CATEGORY_MAX_WIDTH)) {
          this.errorMessage = `Please upload the image of required size which is min height ${CONFIG.CATEGORY_MIN_HEIGHT}, max height ${CONFIG.CATEGORY_MAX_HEIGHT} and min width ${CONFIG.CATEGORY_MIN_WIDTH}, max width ${CONFIG.CATEGORY_MAX_WIDTH}.`;
         // alert()
          this.choosefile="No file chosen...";
      //    alert(this.choosefile)
         this.url='';
            this.url1='';
            this.isImageError=true;
            this.isWrongFormat=true
            return false;
            
        }
        else{
            

          this.choosefile=event.target.files[0].name;
  
        }
      }; 
     
    }



      this.url1 = event.target.files[0];
      console.log(this.url1)


      setTimeout(() => {
        this.loader = false;
        this.keyValue = false;
        this.errorMessage = "";
      }, 3000)
      this.loader = true;

    }
  }
  errorMessage:string;
  successMessage:string;
  success(res) {
    if(res.status==true){
      this._api.showNotification( 'success', res.message );
        this.router.navigate(['theme/categories'])

  } else {
    this._util.markError(this.loginForm);
    this._api.showNotification( 'error', res.message );
   
  }

  }

 


  error(res){
    this._api.showNotification( 'error', res.message );
  }
  trueValue:number=1
  falseValue:number=0
  submit() {
   
    if (this.loginForm.valid&&this.url1!='') {

      this.loader = true;

      const formData = new FormData();
      formData.append('category_image', this.url1);
      formData.append('name', this.loginForm.value.name.trim());
     formData.append('description', this.loginForm.value.descriptionen.trim());
      formData.append('name_ar', this.loginForm.value.namear.trim());
      formData.append('description_ar', this.loginForm.value.descriptionar.trim());
      formData.append('status', this.loginForm.value.statusKey);
      if(this.loginForm.value.is_banner==true){
        formData.append('is_banner', '1');
      }else{
        formData.append('is_banner','0');
      }
      console.log(formData)
      this.api
      .postReqAuth2("admin/category/add",formData).subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  else{
    if(this.url1=='')
    this.isImageError=true
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
    if (this.loginForm.valid&&!this.isWrongFormat) {

      this.loader = true;

      const formData = new FormData();
      formData.append('id', this.id);
      formData.append('category_image', this.url1);
      formData.append('name', this.loginForm.value.name.trim());
     formData.append('description', this.loginForm.value.descriptionen.trim());
      formData.append('name_ar', this.loginForm.value.namear.trim());
      formData.append('description_ar', this.loginForm.value.descriptionar.trim());
      formData.append('status', this.loginForm.value.statusKey);
      if(this.loginForm.value.is_banner==true){
        formData.append('is_banner', '1');
      }else{
        formData.append('is_banner','0');
      }
      console.log(formData)
      this.api
      .putReqAuth("admin/category/edit",formData).subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  } else{
    if(this.isWrongFormat)
    this.isImageError=true
    this._util.markError(this.loginForm);
}
}
id:string=null;
  viewCate(){
    this.api
    .getReqAuth("admin/category/detail?id="+this.id)
    .subscribe(
      res => this.successView(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }
  trimFunction(event){
    var str=event.target.value;
    alert();
    return str.trim();

  }

  successView(res){
    if(res.status==true){
    var data= res.result;
    this.loginForm.get('name').patchValue(data.name);
    this.loginForm.get('namear').patchValue(data.name_ar);
    this.loginForm.get('descriptionen').patchValue(data.description);
    this.loginForm.get('descriptionar').patchValue(data.description_ar);
    this.loginForm.get('statusKey').patchValue(data.status);
    this.url=data.category_image;
    var str = this.url.split('/');
    this.choosefile = str[str.length - 1];
    if(data.is_banner==1){
      this.loginForm.get('is_banner').patchValue(true);
    }else{
      this.loginForm.get('is_banner').patchValue(false);
    }
    }
  }
  //  this.addProperty.get('beds').patchValue(property['bed']);

}