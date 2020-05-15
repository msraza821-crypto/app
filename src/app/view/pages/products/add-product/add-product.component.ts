import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl,FormArray } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { rangeValidator } from 'src/app/validators/range.validator';
import { ColorEvent } from 'ngx-color';
import { OnlyNumberDirective }  from './../../../../directive/only-number.directive';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import * as moment from 'moment';
// import { ThemeService } from 'ng2-charts';
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
  imageErrorMessage:any=ERROR_MESSAGES;
  isImageError=false;
  state;
  keyValue: boolean = false;
  // model={start: new Date(), end: ''}
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay();

  // mindate = moment({year:2020,month:06, day: 06})
  // minDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  // maxDate = moment({year: this.year +16, month: this.month, day: this.day}).format('DD-MM-YYYY');
  // model={minDate:this.minDate,maxDate:this.maxDate}
//   minDate = moment(new Date()).format('YYYY-MM-DD')
// maxDate ="2018-09-08"




  constructor(
    private _fb: FormBuilder,
    private _util: CommonUtil,
    private api: HttpService,
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute,
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
      product_description_en: ["",[Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
      product_name_ar: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_MAX)]],
      product_description_ar: ["", [Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
      attribute_description_ar: ["", [ Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
      attribute_description_en: ["", [Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
     product_price: ["", [Validators.required, rangeValidator(0, 10000)]],
      product_colour: ["", [Validators.required]],
      brand_id: ["", [Validators.required]],
    //  quantity: ["", [Validators.required, Validators.pattern(Regex.phoneNumber), rangeValidator(0, 10000)]],
      category_id: ["", [Validators.required]],
      subCategory: ["", [Validators.required]],
      childCategory: ["", [Validators.required]],
      discount_type: [""],
      discount_value: ["", [Validators.pattern(Regex.phoneNumbers)]],
      discount_range: [""],
      statusKey: [""] ,
      meta_data:this._fb.array([this.createItem()])
     
    });
  }
  rtl(element) {
    if (element.setSelectionRange) {
      element.setSelectionRange(0, 0);
    }
  }
  test(){
    alert()
  }
 
 itemsData: FormArray;
  addItem() {
    
    this.itemsData =  <FormArray>this.loginForm.controls['meta_data'];
    this.productSiz();
    console.log(this.loginForm.controls['meta_data'])
this.itemsData.push(this.createItem())
  }  
  deleteRow(index: number) {
    // control refers to your formarray
    const control = <FormArray>this.loginForm.controls['meta_data'];
    // remove the chosen row
    control.removeAt(index);
  }
  orderForm: FormGroup;




    createItem() {
      return this._fb.group({
        product_size: [''],
        quantity: ["", [Validators.required, Validators.pattern(Regex.phoneNumber), rangeValidator(0, 10000)]],
        product_price:["", [Validators.required, rangeValidator(0, 10000)]],
      });
    }
  choosedDate(event) {
    console.log(event)
    if (event.startDate._d && event.endDate._d) {
      this.loginForm.get('discount_value').setValidators([Validators.required, rangeValidator(0, 10000), Validators.pattern(Regex.phoneNumbers)]);
      this.loginForm.get('discount_value').updateValueAndValidity();
      this.loginForm.get('discount_type').setValidators([Validators.required]);
      this.loginForm.get('discount_type').updateValueAndValidity();
      this.loginForm.get('discount_range').setValidators([Validators.required]);
      this.loginForm.get('discount_range').updateValueAndValidity();
    }
  }
  mindate=moment();
  id: string = null;
  ngOnInit() {
    this.productSize();
    this.productSiz();
    this.productCategory();
    this.state = "";
    // this._route.params.subscribe(param => {
    //   if (param && param["id"]) {
    //     this.id = param["id"];
    //     this.viewBrand();
    //   }
    // })
    this._route.params.subscribe(param => {
      if (param && param["product_id"]) {
        this.product_id = param["product_id"];
        this.id = "";
        this.viewBrand1();
      }
    })
    this.createForm();
    this.loginForm.get('discount_value').valueChanges
    .pipe(debounceTime(this.debounce), distinctUntilChanged())
    .subscribe(query => {
      this.errorMessage="";
     var arrayDtata=<FormArray>this.loginForm.controls['meta_data'].value;
     for(var i=0;i<arrayDtata.length;i++){
    //   console.log(typeof Number(arrayDtata[i].product_price)+'  '+typeof Number(this.loginForm.get('discount_value').value));
      if(Number(arrayDtata[i].product_price)<Number(this.loginForm.get('discount_value').value)){
      //  alert();
        this.errorMessage="Discount Price must be less than Product Price";
        return false;
      }
     }
    });
    this.loginForm.controls['meta_data'].valueChanges
    .pipe(debounceTime(this.debounce), distinctUntilChanged())
    .subscribe(query => {
      this.errorMessage="";
     var arrayDtata=<FormArray>this.loginForm.controls['meta_data'].value;
     for(var i=0;i<arrayDtata.length;i++){
      console.log(typeof Number(arrayDtata[i].product_price)+'  '+typeof Number(this.loginForm.get('discount_value').value));
      if(Number(arrayDtata[i].product_price)<Number(this.loginForm.get('discount_value').value)){
      //  alert();
        this.errorMessage="Discount Price must be less than Product Price";
        return false;
      }
     }
    });
  }
  private debounce: number = 400;
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
  get discount_type(): FormControl {
    return this.loginForm.get("discount_type") as FormControl;
  }
  get discount_value(): FormControl {
    return this.loginForm.get("discount_value") as FormControl;
  }

  get product_price(): FormControl {
   return this.loginForm.get("product_price") as FormControl;
    
   // return this.loginForm.get("meta_data").get('product_size') as FormControl;
  }
  get product_colour(): FormControl {
    return this.loginForm.get("product_colour") as FormControl;
  }
  get brand_id(): FormControl {
    return this.loginForm.get("brand_id") as FormControl;
  }
  get quantity(): FormControl {
    return this.loginForm.get("quantity") as FormControl;
   // return this.loginForm.get("meta_data").get('quantity') as FormControl;
  }

 
   
  get meta_data() : FormControl {
    return this.loginForm.get("meta_data") as FormControl
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
    return this.loginForm.get("attribute_description_en") as FormControl;
  }
  get attribute_description_ar(): FormControl {
    return this.loginForm.get("attribute_description_ar") as FormControl;
  }
  get product_description_ar(): FormControl {
    return this.loginForm.get("product_description_ar") as FormControl;
  }
  get product_size(): FormControl {
    return this.loginForm.get("product_size") as FormControl;
    //return this.loginForm.get("meta_data").get('product_size') as FormControl;
  }

  errorMessage: string
  imageFormats: Array<string> = ['jpeg', 'png', 'jpg'];
  videoFormats: Array<string> = ["webm", "mp4", "ogv"]
  choosefile: string = "No file chosen...";
  urlData: any = [];
  urlForm: any = [];
  choosefileData: any = [];
  choosefileDatas: string = "No file chosen";
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  onSelectFileMultiple(event) {
    this.keyValue = true;
    this.isImageError=false;
    if (event.target.files.length > 0) {
      var ins = event.target.files.length;
      for (var x = 0; x < ins; x++) {

        var mimeType = event.target.files[x].type;
        console.log('type',mimeType)
        var file = event.target.files[x];

        // this.choosefileData.push(event.target.files[x].name);



        const width = file.naturalWidth;
        const height = file.naturalHeight;

        window.URL.revokeObjectURL(file.src);
        //  var checkimg = file.toLowerCase();
        const type = file.type.split('/');
        if (type[0] === 'image' && this.imageFormats.includes(type[1].toLowerCase())) {
          this.choosefileData.push(event.target.files[x].name);

        } else {
          this.errorMessage = "Please use proper format of image like jpeg,jpg and png only.";
          // this._api.showNotification('error', this.errorMessage);
          return false;
        }


        let reader1 = new FileReader();
        reader1.readAsDataURL(event.target.files[x]); // read file as data url
        reader1.onload = (event: any) => { // called once readAsDataURL is completed
          // this.url = event.result;
          this.urlData.push(event.target.result);
          // this.url = event.target.result;
        }

        
        console.log(this.urlData,'urldata')
        this.urlForm.push(event.target.files[x]);
        console.log('image url',this.url1)



        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[x]); // read file as data url
      
        reader.onload = () => {
        
          const img = new Image();
          img.src = reader.result as string;
          img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            console.log('Width and Height', width, height);
            if ((height <= CONFIG.PRODUCT_MIN_HEIGHT || height >= CONFIG.PRODUCT_MAX_HEIGHT) || (width <= CONFIG.PRODUCT_MIN_WIDTH || width >= CONFIG.PRODUCT_MAX_WIDTH)) {
              this.errorMessage = `Please upload the image of required size which is min height ${CONFIG.PRODUCT_MIN_HEIGHT}, max height ${CONFIG.PRODUCT_MAX_HEIGHT} and min width ${CONFIG.PRODUCT_MIN_WIDTH}, max width ${CONFIG.PRODUCT_MAX_WIDTH}.`;
             // alert()
              // this.choosefile="No file chosen...";
          //    alert(this.choosefile)
             // this.url='';
                this.url1='';
                this.url=''
                // this.isImageError=true
                console.log('urldata',this.urlData)
                console.log(this.choosefileDatas)
                console.log('lenght',this.urlData.length)
                if(this.urlData.length>0)
                {
              this.urlData.splice(this.urlData.length-1,1);
               this.choosefileData.splice(this.choosefileData.length-1,1)
               this.choosefileDatas = this.choosefileData.join();
               if(this.choosefileData.length==0)
               this.choosefileDatas="No file chosen";
            }
                // this.choosefileDatas,splice(this.choosefileDatas.length,1)
                return false;
            }
            else{
              // this.url = event.target.result;
              console.log(this.url,'url')      
    
              // this.choosefile=event.target.files[0].name;
      
            }
          }; 
         
        }


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
        this.choosefile= "No file chosen...";
        this._api.showNotification('error', this.errorMessage);
        return false;
      }


      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        // this.url = event.result;
        this.url = event.target.result;
        
      }
   //   this.urlData.push(event.target.result);

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
  viewBrand1() {
    this.spinner.show();
    this.api
      .getReqAuth("admin/product/product-detail?id=" + this.product_id)
      .subscribe(
        res => this.successView(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  formData: any = [];
  successView(res) {
    if (res.status == true) {
      var data = res.result;
      this.sub_cate(data['category']);
      this.child_cate(data['sub_category'])
      Object.keys(this.loginForm.controls).forEach((control) => {
    if(data[control]){
        this.loginForm.get(control).patchValue(data[control]);
    }

      });
      this.loginForm.get('category_id').patchValue(data['category']);

      this.loginForm.get('subCategory').patchValue(data['sub_category']);
      this.loginForm.get('childCategory').patchValue(data['child_category']);
      this.loginForm.get('discount_range').patchValue({ startDate: moment(data['discount_start_date'] ), endDate: moment( data['discount_end_date'] ) })
      this.loginForm.get('statusKey').patchValue(data['status'])
      //  this.loginForm.get
    }
    this.state = data['product_colour'];
    if (this.id) {
      for (var i = 0; i < data.productMedia.length; i++) {
        if (data.productMedia[i].media_url) {
          this.urlData.push(data.productMedia[i].media_url);
        }
      }
    }
    console.log(data.productMedia);
    if (data['discount_type'] == 2) {
      this.placeHolderText = "Discounted price";
    } else {
      this.placeHolderText = "Discounted price(%)";
    }

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    //  this.addProperty.get('beds').patchValue(property['bed']);

  }
  placeHolderText = "Discounted price";
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

      this.placeHolderText = "Discounted price(%)";
      this.FORM_ERROR.discount_value.range = ERROR_MESSAGES.RANGE_PERCENTAGE;
    } else if (event.target.value == 1) {
      this.loginForm.get('discount_value').setValidators([Validators.required, rangeValidator(0, 10000)]);
      this.loginForm.get('discount_value').updateValueAndValidity();
      this.loginForm.get('discount_type').setValidators([Validators.required]);
      this.loginForm.get('discount_type').updateValueAndValidity();
      this.loginForm.get('discount_range').setValidators([Validators.required]);
      this.loginForm.get('discount_range').updateValueAndValidity();
      this.placeHolderText = "Discounted price";
      this.FORM_ERROR.discount_value.range = ERROR_MESSAGES.RANGE;
      this.dPrice = "(QAR)";
      this.min = 0;
      this.max = 10000;
    } else {
      this.placeHolderText = "Discounted price";
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
      if (this.loginForm.valid&&this.urlData.length>0) {

        start1 = this.loginForm.value.discount_range.startDate._d;

        var startDate = new Date(start1)
        start1 = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        end1 = this.loginForm.value.discount_range.endDate._d;
        var endDate = new Date(end1)
        end1 = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
      }



      const formData = new FormData();
      formData.append('id', this.id);
      formData.append('product_name_en', this.loginForm.value.product_name_en);
      formData.append('product_description_en', this.loginForm.value.product_description_en);
      formData.append('product_name_ar', this.loginForm.value.product_name_ar);
      formData.append('product_description_ar', this.loginForm.value.product_description_ar);
      formData.append('attribute_description_ar', this.loginForm.value.attribute_description_ar);
      formData.append('attribute_description_en', this.loginForm.value.attribute_description_en);
      formData.append('product_size', this.loginForm.value.product_size);
      formData.append('product_price', this.loginForm.value.product_price);
      formData.append('product_colour', this.loginForm.value.product_colour);
      formData.append('brand_id', this.loginForm.value.brand_id);
      formData.append('quantity', this.loginForm.value.quantity);
      formData.append('category', this.loginForm.value.category_id);
      formData.append('sub_category', this.loginForm.value.subCategory);
      formData.append('child_category', this.loginForm.value.childCategory);
      formData.append('discount_type', this.loginForm.value.discount_type);
      formData.append('discount_value', this.loginForm.value.discount_value);
      formData.append('discount_start_date', start1);
      formData.append('discount_end_date', end1);
      formData.append('status', this.loginForm.value.statusKey);

      for (var x = 0; x < this.urlForm.length; x++) {
        formData.append('products_images[]', this.urlForm[x]);
      }



      console.log(formData)
      this.api
        .putReqAuth("admin/product/edit-product", formData).subscribe(
          res => this.success(res),
          err => this.error(err),
          () => (this.loader = false)
        );
    } else {
      if(this.urlData.length==0)
      this.isImageError=true
      this._util.markError(this.loginForm);
    }
  }
  errorData:boolean=false;
  submit() {
    console.log( this.loginForm.value.discount_range,"===========================")
    console.log(this.loginForm.value,'length',this.urlData.length!=0);
    console.log(this.loginForm)
    this.errorData=true;
    console.log('form validation',this.loginForm.valid)
    if (this.loginForm.valid&&this.urlData.length>0) {
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
      const formData = new FormData();
      formData.append('product_name_en', this.loginForm.value.product_name_en);
      formData.append('product_description_en', this.loginForm.value.product_description_en);
      formData.append('product_name_ar', this.loginForm.value.product_name_ar);
      formData.append('product_description_ar', this.loginForm.value.product_description_ar);
      formData.append('attribute_description_ar', this.loginForm.value.attribute_description_ar);
      formData.append('attribute_description_en', this.loginForm.value.attribute_description_en);
     // formData.append('product_size', this.loginForm.value.product_size);
     // formData.append('product_price', this.loginForm.value.product_price);
      formData.append('product_colour', this.loginForm.value.product_colour);
      formData.append('brand_id', this.loginForm.value.brand_id);
    // formData.append('quantity', this.loginForm.value.quantity);
      formData.append('category', this.loginForm.value.category_id);
      formData.append('sub_category', this.loginForm.value.subCategory);
      formData.append('child_category', this.loginForm.value.childCategory);
      formData.append('discount_type', this.loginForm.value.discount_type);
      formData.append('discount_value', this.loginForm.value.discount_value);
      formData.append('discount_start_date', (start1)?start1:null);
      formData.append('discount_end_date', (end1)?end1:null);
      formData.append('meta_data',JSON.stringify(this.loginForm.value.meta_data));


      var ins = this.urlForm.length;
      for (var x = 0; x < ins; x++) {
        formData.append('product_images', this.urlForm[x],this.urlForm[x].name);
      }
      if(this.url1){
      formData.append('product_images',this.url1);
      }
      console.log(formData)
      this.api
        .postReqAuth("admin/product/add-product", formData).subscribe(
          res => this.success(res),
          err => this.error(err),
          () => (this.loader = false)
        );
    } else {
      if(this.urlData.length==0)
      this.isImageError=true;
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

  error(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this._api.showNotification('error', res.message);
  }

}