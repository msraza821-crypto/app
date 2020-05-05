import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { rangeValidator } from 'src/app/validators/range.validator';
import { ColorEvent } from 'ngx-color';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"]
})
export class EditProductComponent implements OnInit {

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  loginFormEdit:FormGroup;
  url1 = ''; url: string = '';
  message: string = '';
  state;
  keyValue: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _util: CommonUtil,
    private api: HttpService,
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute,
    private modalService: NgbModal,
    private _api: AppService,
    private router: Router) {
  }
  handleChange(event: ColorEvent) {
    if (event.color.hex) {
      console.log(event.color)
      var hex = event.color.hex;
      this.state = hex;
      this.loginForm.get('product_colour').patchValue(hex);
    }
  }
  add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
      // you can also use substr instead of substring
      string = string.substring(0, limit) + dots;
    }

    return string;
  }
  FORM_ERROR = {
    product_name_en: {
      required: ERROR_MESSAGES.NAME_ENGLISH_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PRODUCT_MAX}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_description_en: {
      required: ERROR_MESSAGES.DESCRIPTION_ENGLISH_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PRODUCT_DESCRIPTION}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_name_ar: {
      required: ERROR_MESSAGES.NAME_ARABIC_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PRODUCT_MAX}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_description_ar: {
      required: ERROR_MESSAGES.DESCRIPTION_ARABIC_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PRODUCT_DESCRIPTION}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    attribute_description_en: {
      required: ERROR_MESSAGES.DESCRIPTION_ENGLISH_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PRODUCT_DESCRIPTION}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    attribute_description_ar: {
      required: ERROR_MESSAGES.DESCRIPTION_ARABIC_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PRODUCT_DESCRIPTION}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_size: {
      required: ERROR_MESSAGES.PRODUCT_SIZE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PRODUCT_DESCRIPTION}`,

      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_price: {
      required: ERROR_MESSAGES.PRODUCT_PRIZE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NUMBER_LENGTH}`,
      pattern: ERROR_MESSAGES.NUMBER_REQUIRED,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      range: ERROR_MESSAGES.RANGE,
    },
    product_colour: {
      required: ERROR_MESSAGES.PRODUCT_COLOUR_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PRODUCT_DESCRIPTION}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    brand_id: {
      required: ERROR_MESSAGES.BRAND_REQUIRED,

    },
    quantity: {
      required: ERROR_MESSAGES.QUANTITY_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NUMBER_LENGTH}`,
      pattern: ERROR_MESSAGES.NUMBER_REQUIRED,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      range: ERROR_MESSAGES.RANGE,
    },
    category_id: {
      required: ERROR_MESSAGES.CATEGORY_REQUIRED,
    },
    subCategory: {
      required: ERROR_MESSAGES.SUBCATEGORY_REQUIRED,
    },
    childCategory: {
      required: ERROR_MESSAGES.CHILD_CATEGORY_REQUIRED,

    },
    discount_value: {
      required: ERROR_MESSAGES.DISCOUNT_VALUE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NUMBER_LENGTH}`,
      pattern: ERROR_MESSAGES.NUMBER_REQUIRED,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      range: ERROR_MESSAGES.RANGE,
    },
    discount_type: {
      required: ERROR_MESSAGES.DISCOUNT_TYPE_REQUIRED,

    },
    discount_range: {
      required: ERROR_MESSAGES.DISCOUNT_RANGE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PRODUCT_DESCRIPTION}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },

  };
  onKeydown(event) {
    this.loginForm.get('discount_range').patchValue('');
    this.loginForm.get('discount_value').patchValue('');
    this.loginForm.get('discount_type').patchValue('');
    this.loginForm.get('discount_value').setValidators([Validators.pattern(Regex.phoneNumbers)]);
    this.loginForm.get('discount_value').updateValueAndValidity();
    this.loginForm.get('discount_type').setValidators([]);
    this.loginForm.get('discount_type').updateValueAndValidity();
    this.loginForm.get('discount_range').setValidators([]);
    this.loginForm.get('discount_range').updateValueAndValidity();
  }
  Reset() {
    this.loginForm.get('product_colour').patchValue('');
    this.state = '#ff0000';
  }
  createForm() {
    this.loginForm = this._fb.group({
      product_name_en: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_MAX)]],
      product_description_en: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
      product_name_ar: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_MAX)]],
      product_description_ar: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
       brand_id: ["", [Validators.required]],
      category_id: ["", [Validators.required]],
      subCategory: ["", [Validators.required]],
      childCategory: ["", [Validators.required]],
      discount_type: [""],
      discount_value: ["", [Validators.pattern(Regex.phoneNumbers)]],
      discount_range: [""],
      statusKey: [""]
    });
  }
  rtl(element) {
    if (element.setSelectionRange) {
      element.setSelectionRange(0, 0);
    }
  }
  choosedDate(event) {
    console.log(event)
    if (event.startDate!=null && event.endDate!=null && event.startDate._d && event.endDate._d) {
      this.loginForm.get('discount_value').setValidators([Validators.required, rangeValidator(0, 10000), Validators.pattern(Regex.phoneNumbers)]);
      this.loginForm.get('discount_value').updateValueAndValidity();
      this.loginForm.get('discount_type').setValidators([Validators.required]);
      this.loginForm.get('discount_type').updateValueAndValidity();
      this.loginForm.get('discount_range').setValidators([Validators.required]);
      this.loginForm.get('discount_range').updateValueAndValidity();
    }
  }
  id: string = null;
  ngOnInit() {
    this.productSize();
    this.productSiz();
    this.productCategory();
  
    this._route.params.subscribe(param => {
      if (param && param["id"]) {
        this.id = param["id"];
        this.createForm();
        this.viewBrand();
       
      }
    })
  // this.createFormEdit();
   
  }
  product_id: any;


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
  categories: any = [];
  subcategories: any = [];
  childcategories: any = [];
  onOptionsSelectedSub(event) {
    const value = event.target.value;
    this.api
      .getReqAuth("admin/product/category-list?parent_id=" + value).subscribe(
        res => this.successCategorySub(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  onOptionsSelectedChild(event) {
    const value = event.target.value;
    this.api
      .getReqAuth("admin/product/category-list?parent_id=" + value).subscribe(
        res => this.successCategoryChild(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
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
  get statusEdit(): FormControl {
    return this.loginForm.get("statusEdit") as FormControl;
  }
  get discount_type(): FormControl {
    return this.loginForm.get("discount_type") as FormControl;
  }
  get discount_value(): FormControl {
    return this.loginForm.get("discount_value") as FormControl;
  }

  get product_price(): FormControl {
    return this.loginFormEdit.get("product_price") as FormControl;
  }
  get product_colour(): FormControl {
    return this.loginFormEdit.get("product_colour") as FormControl;
  }
  get brand_id(): FormControl {
    return this.loginForm.get("brand_id") as FormControl;
  }
  get quantity(): FormControl {
    return this.loginFormEdit.get("quantity") as FormControl;
  }


  get statusKey(): FormControl {
    return this.loginForm.get("statusKey") as FormControl;
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
  get attribute_description_en(): FormControl {
    return this.loginFormEdit.get("attribute_description_en") as FormControl;
  }
  get attribute_description_ar(): FormControl {
    return this.loginFormEdit.get("attribute_description_ar") as FormControl;
  }
  get product_description_ar(): FormControl {
    return this.loginForm.get("product_description_ar") as FormControl;
  }
  get product_size(): FormControl {
    return this.loginFormEdit.get("product_size") as FormControl;
  }

  errorMessage: string
  imageFormats: Array<string> = ['jpeg', 'png', 'jpg'];
  videoFormats: Array<string> = ["webm", "mp4", "ogv"]
  choosefile: string = "No file chosen...";
  choosefileVideo:string="No video file chosen..."
  urlData: any = [];
  urlForm: any = [];
  choosefileData: any = [];
  choosefileDatas: string = "No file chosen...";
  onSelectFileMultiple(event) {
    this.keyValue = true;
    if (event.target.files.length > 0) {
      var ins = event.target.files.length;
      for (var x = 0; x < ins; x++) {

        var mimeType = event.target.files[x].type;
        var file = event.target.files[x];

        this.choosefileData.push(event.target.files[x].name);
        const width = file.naturalWidth;
        const height = file.naturalHeight;

        window.URL.revokeObjectURL(file.src);
        //  var checkimg = file.toLowerCase();
        const type = file.type.split('/');
        if (type[0] === 'image' && this.imageFormats.includes(type[1].toLowerCase())) {

        } else {
          this.errorMessage = "Please use proper format of image like jpeg,jpg and png only.";
          return false;
        }


        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[x]); // read file as data url
        reader.onload = (event: any) => { // called once readAsDataURL is completed
          // this.url = event.result;
          this.urlData.push(event.target.result);
        }


        this.urlForm.push(event.target.files[0]);
        console.log(this.url1)


        setTimeout(() => {
          this.loader = false;
          this.keyValue = false;
          this.errorMessage = "";
        }, 3000)
        this.loader = true;

      }
    }
    this.choosefileDatas = this.choosefileData.join();
  }
  createFormEdit(data) {
    this.urlData=[];
    this.url="";
     console.log(data.product_media)
      for (var i = 0; i < data.product_media.length; i++) {
        if (data.product_media[i].mime_type=="image/jpeg" || data.product_media[i].mime_type=="image/jpg" || data.product_media[i].mime_type=="image/png") {
          this.urlData.push(data.product_media[i].media_url);
          var str1 = data.product_media[i].media_url.split('/');
          this.choosefileData.push(str1[str1.length - 1]);
        }
      }
      if(this.choosefileData.length>0){
      this.choosefileDatas = this.choosefileData.join();
      }
      for (var i = 0; i < data.product_media.length; i++) {
        if (data.product_media[i].mime_type=="video/mp4" || data.product_media[i].mime_type=="video/ogv" || data.product_media[i].mime_type=="video/webm") {
          this.url=data.product_media[i].media_url;
          var str = this.url.split('/');
          this.choosefile = str[str.length - 1];
       
        }
      }
    
    this.loginFormEdit = this._fb.group({
       product_size: [data.product_size, [Validators.required]],
      attribute_description_ar: [data.attribute_description_ar, [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
      attribute_description_en: [data.attribute_description_en, [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
      product_price: [data.product_price, [Validators.required, rangeValidator(0, 10000)]],
      product_colour: [data.product_colour, [Validators.required]],
    
      quantity: [data.quantity, [Validators.required, Validators.pattern(Regex.phoneNumber), rangeValidator(0, 10000)]],
      statusEdit: [data.status]
    });
  }
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  onSelectFile(event) {
    this.keyValue = true;
    if (event.target.files && event.target.files[0]) {
      var mimeType = event.target.files[0].type;
      var file = event.target.files[0];

      this.choosefile = event.target.files[0].name;
      const width = file.naturalWidth;
      const height = file.naturalHeight;

      window.URL.revokeObjectURL(file.src);
      //  var checkimg = file.toLowerCase();
      const type = file.type.split('/');
      if (type[0] === 'video' && this.videoFormats.includes(type[1].toLowerCase())) {

      } else {
        this.errorMessage = "Please use proper format of video like webm,mp4 or ogv only.";
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
        this.errorMessage = "";
      }, 3000)
      this.loader = true;

    }
  }
  viewBrand() {
    this.spinner.show();
    this.api
      .getReqAuth("admin/product/product-detail?id=" + this.id)
      .subscribe(
        res => this.successView(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
 
  formData: any = [];
  start;
  end;
  deletedId;
  statusId;
  openVerticallyCentered(poup, data) {
    this.modalService.open(poup, { centered: true }); 
  this.deletedId=data.attribute_id;
  this.statusId=data.status;
  
  }
  attribute_id;
  openVerticallyCenteredEdit(poup, data) {
    this.state = "";
    this.choosefile = "No file chosen...";
    this.attribute_id=data.attribute_id;
    this.createFormEdit(data)
    this.modalService.open(poup, { centered: true }); 
  }
  successView(res) {
    if (res.status == true) {
      var data = res.result;
      this.sub_cate(data['category']);
      this.child_cate(data['sub_category'])
      Object.keys(this.loginForm.controls).forEach((control) => {

        this.loginForm.get(control).patchValue(data[control]);

      });
      this.loginForm.get('category_id').patchValue(data['category']);

      this.loginForm.get('subCategory').patchValue(data['sub_category']);
      this.loginForm.get('childCategory').patchValue(data['child_category']);
      console.log(data['discount_start_date'] );
      console.log(data['discount_end_date'] )
      var start1=moment(data['discount_start_date']);
      var end1=moment(data['discount_end_date']);
      
    this.loginForm.get('discount_range').patchValue({ startDate: start1, endDate:end1 });
     console.log(this.loginForm.value.discount_range);
      this.loginForm.get('statusKey').patchValue(data['status'])
      //  this.loginForm.get
    }
    this.collection=data['product_attributes']
    this.state = data['product_colour'];
    // if (this.id) {
    //   for (var i = 0; i < data.productMedia.length; i++) {
    //     if (data.productMedia[i].media_url) {
    //       this.urlData.push(data.productMedia[i].media_url);
    //     }
    //   }
    // }

    if (data['discount_type'] == 2) {
      this.placeHolderText = "Discount Price";
    } else {
      this.placeHolderText = "Percentage Discount";
    }

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    //  this.addProperty.get('beds').patchValue(property['bed']);

  }
  collection:any=[];
  placeHolderText = "Discount Price";
  dPrice: string = '(QAR)';

  min: Number = 0;
  max: Number = 10000;
  changeNumber(e) {
    var str = e.target.value;
    var input = e.target;
    var value = Number(input.value);
    var key = Number(e.key);
    if (Number.isInteger(key)) {
      value = Number("" + value + key);
      if (value > this.max) {
        return false;
      }
      this.loginForm.get('discount_value').patchValue(str)
    }

  }
  changeType(event) {

    this.loginForm.get('discount_value').patchValue('');
    console.log(event.target.value);
    if (event.target.value == 2) {
      this.min = 0;
      this.max = 100;
      this.loginForm.get('discount_value').setValidators([Validators.required, rangeValidator(0, 100)]);
      this.loginForm.get('discount_value').updateValueAndValidity();
      this.loginForm.get('discount_type').setValidators([Validators.required]);
      this.loginForm.get('discount_type').updateValueAndValidity();
      this.loginForm.get('discount_range').setValidators([Validators.required]);
      this.loginForm.get('discount_range').updateValueAndValidity();
      this.dPrice = "(%)";

      this.placeHolderText = "Percentage Discount";
      this.FORM_ERROR.discount_value.range = ERROR_MESSAGES.RANGE_PERCENTAGE;
    } else if (event.target.value == 1) {
      this.loginForm.get('discount_value').setValidators([Validators.required, rangeValidator(0, 10000)]);
      this.loginForm.get('discount_value').updateValueAndValidity();
      this.loginForm.get('discount_type').setValidators([Validators.required]);
      this.loginForm.get('discount_type').updateValueAndValidity();
      this.loginForm.get('discount_range').setValidators([Validators.required]);
      this.loginForm.get('discount_range').updateValueAndValidity();
      this.placeHolderText = "Discount Price";
      this.FORM_ERROR.discount_value.range = ERROR_MESSAGES.RANGE;
      this.dPrice = "(QAR)";
      this.min = 0;
      this.max = 10000;
    } else {
      this.placeHolderText = "Discount Price";
      this.min = 0;
      this.max = 10000;
      this.loginForm.get('discount_range').patchValue('');
      this.loginForm.get('discount_value').patchValue('');
      this.loginForm.get('discount_type').patchValue('');
      this.loginForm.get('discount_value').setValidators([Validators.pattern(Regex.phoneNumbers)]);
      this.loginForm.get('discount_value').updateValueAndValidity();
      this.loginForm.get('discount_type').setValidators([]);
      this.loginForm.get('discount_type').updateValueAndValidity();
      this.loginForm.get('discount_range').setValidators([]);
      this.loginForm.get('discount_range').updateValueAndValidity();
      this.dPrice = "(QAR)";
    }

  }
  update() {
    console.log(this.loginForm.value)
    console.log(this.loginForm.value.discount_range)
    if (this.loginForm.valid) {
      var start1 = "";
      var end1 = "";

      this.spinner.show();
      if (this.loginForm.value.discount_range) {

        start1 = this.loginForm.value.discount_range.startDate._d;

        var startDate = new Date(start1)
        start1 = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        end1 = this.loginForm.value.discount_range.endDate._d;
        var endDate = new Date(end1)
        end1 = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
      }
    
      var body={'id':this.id,
      'product_name_en':this.loginForm.value.product_name_en,
      'product_description_en':this.loginForm.value.product_description_en,
      'product_name_ar': this.loginForm.value.product_name_ar,
      'product_description_ar': this.loginForm.value.product_description_ar,
      'brand_id': this.loginForm.value.brand_id,
      'category': this.loginForm.value.category_id,
      'sub_category': this.loginForm.value.subCategory,
      'child_category': this.loginForm.value.childCategory,
      'discount_type':this.loginForm.value.discount_type,
      'discount_value': this.loginForm.value.discount_value,
      'discount_start_date': start1,
      'discount_end_date': end1,
      'status':this.loginForm.value.statusKey
    }
      this.api
        .putReqAuth("admin/product/edit-product", body).subscribe(
          res => this.success(res),
          err => this.error(err),
          () => (this.loader = false)
        );
    } else {
      this._util.markError(this.loginForm);
    }
  }

  successMessage: string;
  changeComplete(event) {
    console.log(event)
  }
  success(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    if (res.status == true) {
      this._api.showNotification('success', res.message);
      this.router.navigate(['theme/products'])

    } else {
      this._util.markError(this.loginForm);
      this._api.showNotification('error', res.message);
    }

  }
  update_attributes() {
    
    if (this.loginFormEdit.valid) {
      const formData = new FormData();
      formData.append('id', this.attribute_id);   
      formData.append('product_id', this.id);   
      formData.append('attribute_description_ar', this.loginFormEdit.value.attribute_description_ar);
      formData.append('attribute_description_en', this.loginFormEdit.value.attribute_description_en);
      formData.append('product_size', this.loginFormEdit.value.product_size);
      formData.append('product_price', this.loginFormEdit.value.product_price);
      formData.append('product_colour', this.loginFormEdit.value.product_colour);
      formData.append('quantity', this.loginFormEdit.value.quantity);  
      formData.append('status', this.loginFormEdit.value.statusEdit);
      var ins = this.urlForm.length;
      for (var x = 0; x < ins; x++) {
        formData.append('product_images', this.urlForm[x],this.urlForm[x].name);
      }

      this.api
        .putReqAuth("admin/product/edit-product-attribute", formData).subscribe(
          res => this.successAttribute(res),
          err => this.error(err),
          () => (this.loader = false)
        ); 
    } else {
      this._util.markError(this.loginForm);
    }
  }
  successAttribute(res){
    if (res.status == true) {
         this.modalService.dismissAll();
         this._api.showNotification( 'success', res.message );
         this.ngOnInit();
       } else {
         this._api.showNotification( 'error', res.message );
      
       }
     }

  error(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this._api.showNotification('error', res.message);
  }

  yes() {
    this.modalService.dismissAll();
    //var formData=new FormData();
    //   formData.append('id',this.deletedId)
    this.api
      .putReqAuth("admin/product/update-attribute-status", { status: 'trashed', id: this.deletedId }).subscribe(
        res => this.successdelete(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }

  yesStatus() {
    if (this.statusId == 'active') {
      this.statusId = "inactive";
    } else {
      this.statusId = "active";
    }
    this.modalService.dismissAll();
    this.api
      .putReqAuth("admin/product/update-attribute-status", { id: this.deletedId, status: this.statusId })
      .subscribe(
        res => this.successStatus(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  successStatus(res) {
    if (res.status == true) {
      this._api.showNotification( 'success', res.message );
      this.ngOnInit();
    } else {
      this._api.showNotification( 'error', res.message );
   
    }
   

  }
  successdelete(res) {
    if (res.status == true) {
      this._api.showNotification( 'success', res.message );

      this.ngOnInit();
    } else {
      this._api.showNotification( 'error', res.message );
    
    }


  }

}