import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { rangeValidator } from 'src/app/validators/range.validator';

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {


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
    product_name_en: {
      required: ERROR_MESSAGES.NAME_ENGLISH_REQUIRED, 
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.B_NAME}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_description_en: {
      required: ERROR_MESSAGES.DESCRIPTION_ENGLISH_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_name_ar: {
      required: ERROR_MESSAGES.NAME_ARABIC_REQUIRED, 
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.B_NAME}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_description_ar: {
      required: ERROR_MESSAGES.DESCRIPTION_ARABIC_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_size: {
      required: ERROR_MESSAGES.PRODUCT_SIZE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_prize: {
      required: ERROR_MESSAGES.PRODUCT_PRIZE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_colour: {
      required: ERROR_MESSAGES.PRODUCT_COLOUR_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    brand_id: {
      required: ERROR_MESSAGES.BRAND_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    quantity: {
      required: ERROR_MESSAGES.QUANTITY_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    category_id: {
      required: ERROR_MESSAGES.CATEGORY_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    subCategory: {
      required: ERROR_MESSAGES.SUBCATEGORY_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    childCategory: {
      required: ERROR_MESSAGES.CHILDCATEGORY_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    discount_value: {
      required: ERROR_MESSAGES.DISCOUNT_VALUE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    discount_type: {
      required: ERROR_MESSAGES.DISCOUNT_TYPE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    discount_range: {
      required: ERROR_MESSAGES.DISCOUNT_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
  };

  createForm() {
    this.loginForm = this._fb.group({
      product_name_en: ["", [Validators.required,Validators.pattern(Regex.spacesDatas),Validators.minLength(CONFIG.NAME_MINLENGTH),Validators.maxLength(CONFIG.PRODUCT_MAX)]],
      product_description_en: ["",[Validators.required,Validators.pattern(Regex.spacesDatas),Validators.minLength(CONFIG.NAME_MINLENGTH),Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
     product_name_ar: ["", [Validators.required,Validators.pattern(Regex.spacesDatas),Validators.minLength(CONFIG.NAME_MINLENGTH),Validators.maxLength(CONFIG.PRODUCT_MAX)]],
     product_description_ar: ["", [Validators.required,Validators.pattern(Regex.spacesDatas),Validators.minLength(CONFIG.NAME_MINLENGTH),Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
     product_size: ["", [Validators.required]],
     product_prize: ["", [Validators.required,rangeValidator(0, 10000),Validators.pattern(Regex.phoneNumbers)]],
     product_colour: ["", [Validators.required, Validators.pattern(Regex.spacesDatas)]],
     brand_id: ["", [Validators.required]],
     quantity: ["", [Validators.required,Validators.pattern(Regex.phoneNumbers),rangeValidator(0, 10000)]],
     category_id: ["", [Validators.required]],
     subCategory: ["", [Validators.required]],
     childCategory: ["", [Validators.required]],     
     discount_type: ["", [Validators.required]],
     discount_value: ["", [Validators.required,rangeValidator(0, 10000),Validators.pattern(Regex.phoneNumbers)]],
     discount_range:["",[Validators.required]]
    });
  }
  rtl(element) {
    if (element.setSelectionRange) {
      element.setSelectionRange(0, 0);
    }
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
    this.createForm();
  }

  productSiz(){
    this.api
    .getReqAuth("admin/product/product-size").subscribe(
      res => this.successSiz(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }
  sizes:any=[];
  successSiz(res:any){
    if(res.status){
     // console.log(res)
     this.sizes=res.result;
    }
  }




  productSize(){
    this.api
    .getReqAuth("admin/product/brand-list").subscribe(
      res => this.successBrand(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }
  brands:any=[];
  successBrand(res:any){
    if(res.status){
     // console.log(res)
     this.brands=res.result;
    }
  }
  categories:any=[];
  productCategory(){
    this.api
    .getReqAuth("admin/product/category-list?parent_id=0").subscribe(
      res => this.successCategory(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }
  successCategory(res){
    if(res.status){
      // console.log(res)
      this.categories=res.result;
     }
  }
  get category_id(): FormControl {
    return this.loginForm.get("category_id") as FormControl;
  }
  get subCategory(): FormControl {
    return this.loginForm.get("subCategory") as FormControl;
  }
  get childCategory(): FormControl {
    return this.loginForm.get("childCategory") as FormControl;
  }
  get discount_range(): FormControl {
    return this.loginForm.get("discount_range") as FormControl;
  }
  get discount_type(): FormControl {
    return this.loginForm.get("discount_type") as FormControl;
  }
  get discount_value(): FormControl {
    return this.loginForm.get("discount_value") as FormControl;
  }

  get product_prize(): FormControl {
    return this.loginForm.get("product_prize") as FormControl;
  }
  get product_colour(): FormControl {
    return this.loginForm.get("product_colour") as FormControl;
  }
  get brand_id(): FormControl {
    return this.loginForm.get("brand_id") as FormControl;
  }
  get quantity(): FormControl {
    return this.loginForm.get("quantity") as FormControl;
  }



  get product_name_en(): FormControl {
    return this.loginForm.get("product_name_en") as FormControl;
  }
  get product_description_en(): FormControl {
    return this.loginForm.get("product_description_en") as FormControl;
  }
  get product_name_ar(): FormControl {
    return this.loginForm.get("product_name_ar") as FormControl;
  }
  get product_description_ar(): FormControl {
    return this.loginForm.get("product_description_ar") as FormControl;
  }
  get product_size(): FormControl {
    return this.loginForm.get("product_size") as FormControl;
  }

  errorMessage:string
  imageFormats: Array<string> = ['jpeg','png','jpg'];
  onSelectFile(event) {
    this.keyValue = true;
    if (event.target.files && event.target.files[0]) {
      var mimeType = event.target.files[0].type;
      var file = event.target.files[0];


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
        this.url = event.result;
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
    this.spinner.show();
    this.api
    .getReqAuth("admin/brand/detail?id="+this.id)
    .subscribe(
      res => this.successView(res),
      err => this.error(err),
      () => (this.loader = false)
    );
  }

  successView(res){
    if(res.status==true){
    var data= res.result;
    this.loginForm.get('name').patchValue(data.name);
    this.loginForm.get('namear').patchValue(data.name_ar);
    this.loginForm.get('descriptionen').patchValue(data.description);
    this.loginForm.get('descriptionar').patchValue(data.description_ar);
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