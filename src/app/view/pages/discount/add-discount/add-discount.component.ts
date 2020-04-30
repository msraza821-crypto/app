import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { rangeValidator } from 'src/app/validators/range.validator';
import { ColorEvent } from 'ngx-color';
@Component({
  selector: "app-add-discount",
  templateUrl: "./add-discount.component.html",
  styleUrls: ["./add-discount.component.css"]
})
export class AddDiscountComponent implements OnInit {


  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  url1 = ''; url: string = '';
  message: string = '';
  state:any;
  keyValue: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _util: CommonUtil,
    private api: HttpService,
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute,
    private _api:AppService,
    private router: Router) {
  }
  handleChange($event: ColorEvent) {
    var hex=$event.color.hex;
    this.state=hex;
   this.loginForm.get('product_colour').patchValue(hex);
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

      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    product_prize: {
      required: ERROR_MESSAGES.PRODUCT_PRIZE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NUMBER_LENGTH}`,
      pattern: ERROR_MESSAGES.NUMBER_REQUIRED,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      range: ERROR_MESSAGES.RANGE,
    },
    product_colour: {
      required: ERROR_MESSAGES.PRODUCT_COLOUR_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
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
      required: ERROR_MESSAGES.DISCOUNT_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },

  };

  createForm() {
    this.loginForm = this._fb.group({
      product_name_en: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_MAX)]],
      product_description_en: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
      product_name_ar: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_MAX)]],
      product_description_ar: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.PRODUCT_DESCRIPTION)]],
      product_size: ["", [Validators.required]],
      product_prize: ["", [Validators.required, rangeValidator(0, 10000)]],
      product_colour: ["", [Validators.required, Validators.pattern(Regex.spaces)]],
      brand_id: ["", [Validators.required]],
      quantity: ["", [Validators.required, Validators.pattern(Regex.phoneNumber), rangeValidator(0, 10000)]],
      category_id: ["", [Validators.required]],
      subCategory: ["", [Validators.required]],
      childCategory: ["", [Validators.required]],
      discount_type: ["", [Validators.required]],
      discount_value: ["", [Validators.required, rangeValidator(0, 10000), Validators.pattern(Regex.phoneNumbers)]],
      discount_range: ["", [Validators.required]],
      statusKey:[""]
    });
  }
  rtl(element) {
    if (element.setSelectionRange) {
      element.setSelectionRange(0, 0);
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
        this.viewBrand();
      }
    })
    this.createForm();
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
  get product_description_ar(): FormControl {
    return this.loginForm.get("product_description_ar") as FormControl;
  }
  get product_size(): FormControl {
    return this.loginForm.get("product_size") as FormControl;
  }

  errorMessage: string
  imageFormats: Array<string> = ['jpeg', 'png', 'jpg'];
  videoFormats: Array<string> = ["webm", "mp4", "ogv"]
  choosefile: string = "No file chosen...";
  urlData: any = [];
  urlForm: any = [];
  choosefileData: any = [];
  choosefileDatas: string = "No file chosen";
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
      this.loginForm.get('discount_range').patchValue({ startDate:{_d: data['discount_start_date']}, endDate:{_d: data['discount_end_date'] }})
      this.loginForm.get('statusKey').patchValue(data['status'])
      //  this.loginForm.get
    }
    this.state=data['product_colour'];
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    //  this.addProperty.get('beds').patchValue(property['bed']);

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
      const formData = new FormData();
      formData.append('id', this.id);
      formData.append('product_name_en', this.loginForm.value.product_name_en);
      formData.append('product_description_en', this.loginForm.value.product_description_en);
      formData.append('product_name_ar', this.loginForm.value.product_name_ar);
      formData.append('product_description_ar', this.loginForm.value.product_description_ar);

      formData.append('product_size', this.loginForm.value.product_size);
      formData.append('product_prize', this.loginForm.value.product_prize);
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
      formData.append('status',  this.loginForm.value.statusKey);

      formData.append('product_image', this.url1);
      for (var x = 0; x < this.urlForm.length; x++) {
        formData.append('products_images', this.urlForm[x]);
      }



      console.log(formData)
      this.api
        .putReqAuth("admin/product/edit-product", formData).subscribe(
          res => this.success(res),
          err => this.error(err),
          () => (this.loader = false)
        );
    } else {
      this._util.markError(this.loginForm);
    }
  }
  submit() {
    console.log(this.loginForm.value)
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
      const formData = new FormData();
      formData.append('product_name_en', this.loginForm.value.product_name_en);
      formData.append('product_description_en', this.loginForm.value.product_description_en);
      formData.append('product_name_ar', this.loginForm.value.product_name_ar);
      formData.append('product_description_ar', this.loginForm.value.product_description_ar);

      formData.append('product_size', this.loginForm.value.product_size);
      formData.append('product_prize', this.loginForm.value.product_prize);
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
      formData.append('product_video', this.url1);

      var ins = this.urlForm.length;
      for (var x = 0; x < ins; x++) {
        formData.append('product_images', this.urlForm[x]);
      }

      console.log(formData)
      this.api
        .postReqAuth("admin/product/add-product", formData).subscribe(
          res => this.success(res),
          err => this.error(err),
          () => (this.loader = false)
        );
    } else {
      this._util.markError(this.loginForm);
    }
  }
  successMessage: string;
  changeComplete(event){
console.log(event)
  }
  success(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    if (res.status == true) {
      this._api.showNotification( 'success', res.message );
        this.router.navigate(['theme/products'])
  
    } else {
      this._util.markError(this.loginForm);
      this._api.showNotification( 'error', res.message );
    }

  }

  error(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this._api.showNotification( 'error', res.message );
  }

}