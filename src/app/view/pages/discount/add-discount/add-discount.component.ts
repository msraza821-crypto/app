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

min:Number=0;
max:Number=10000;
  loader = false;
  CONFIG = CONFIG;
  placeHolderText: string = "Discount Price";
  loginForm: FormGroup;
  url1 = ''; url: string = '';
  message: string = '';
  state: any;
  keyValue: boolean = false;
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
    var hex = event.color.hex;
    this.state = hex;
    this.loginForm.get('product_colour').patchValue(hex);
  }
  FORM_ERROR = {
    title: {
      required: ERROR_MESSAGES.D_TITLE,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.B_NAME}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    description: {
      required: ERROR_MESSAGES.D_DESC,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.DESCRIPTION_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    promocode: {
      required: ERROR_MESSAGES.D_PROMOCODE,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.MAXCODE}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.MINCODE}`,
    },
    min_order_value: {
      required: ERROR_MESSAGES.D_MINORDER,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NUMBER_LENGTH}`,
      pattern: ERROR_MESSAGES.NUMBER_REQUIRED,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      range: ERROR_MESSAGES.RANGE,
    },

    promo_discount: {
      required: ERROR_MESSAGES.DISCOUNT_VALUE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NUMBER_LENGTH}`,
      pattern: ERROR_MESSAGES.NUMBER_REQUIRED,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      range: ERROR_MESSAGES.RANGE,
    },
    promo_type: {
      required: ERROR_MESSAGES.DISCOUNT_TYPE_REQUIRED,

    },
    discount_range: {
      required: ERROR_MESSAGES.D_RANGE,
      pattern: ERROR_MESSAGES.INVALID_INPUT
    },
    assignment: {
      required: ERROR_MESSAGES.TYPE_ASSIGN,
    },
    statusKey: {
      required: ERROR_MESSAGES.STATUS_REQUIRED,

    },
  };

  createForm() {
    this.loginForm = this._fb.group({
      title: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.B_NAME)]],
      description: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.minLength(CONFIG.NAME_MINLENGTH), Validators.maxLength(CONFIG.DESCRIPTION_LENGTH)]],
      promo_type: ["", [Validators.required]],
      promocode: ["", [Validators.required, Validators.minLength(CONFIG.MINCODE), Validators.maxLength(CONFIG.MAXCODE)]],
      min_order_value: ["", [Validators.required, rangeValidator(0, 10000), Validators.pattern(Regex.phoneNumbers)]],
      promo_discount: ["", [Validators.required, rangeValidator(0, 10000),Validators.min(0),Validators.max(10000), Validators.pattern(Regex.phoneNumbers)]],
      discount_range: ["", [Validators.required]],
      statusKey: ["", [Validators.required]],
      assignment: ["", [Validators.required]],

    });
  }
  get title(): FormControl {
    return this.loginForm.get("title") as FormControl;
  }
  get description(): FormControl {
    return this.loginForm.get("description") as FormControl;
  }
  get statusKey(): FormControl {
    return this.loginForm.get("statusKey") as FormControl;
  }
  get promocode(): FormControl {
    return this.loginForm.get("promocode") as FormControl;
  }
  get min_order_value(): FormControl {
    return this.loginForm.get("min_order_value") as FormControl;
  }
  get assignment(): FormControl {
    return this.loginForm.get("assignment") as FormControl;
  }
  get discount_range(): FormControl {
    return this.loginForm.get("discount_range") as FormControl;
  }
  get promo_type(): FormControl {
    return this.loginForm.get("promo_type") as FormControl;
  }
  get promo_discount(): FormControl {
    return this.loginForm.get("promo_discount") as FormControl;
  }
  rtl(element) {
    if (element.setSelectionRange) {
      element.setSelectionRange(0, 0);
    }
  }
  id: string = null;
  ngOnInit() {
   
    this._route.params.subscribe(param => {
      if (param && param["id"]) {
        this.id = param["id"];
        this.viewBrand();
      }
    })
    this.createForm();
  }














  viewBrand() {
    this.spinner.show();
    this.api
      .getReqAuth("admin/discount/detail?id=" + this.id)
      .subscribe(
        res => this.successView(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }

  successView(res) {
    if (res.status == true) {
      var data = res.result;

      Object.keys(this.loginForm.controls).forEach((control) => {

        this.loginForm.get(control).patchValue(data[control]);

      });
      this.loginForm.get('discount_range').patchValue({ startDate: { _d: data['start_date'] }, endDate: { _d: data['end_date'] } })
      this.loginForm.get('statusKey').patchValue(data['status'])
      if(data['promo_type']==2){
        this.placeHolderText="Percentage Discount";
      }else{
        this.placeHolderText="Discount Price";
      }
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);

      //  this.addProperty.get('beds').patchValue(property['bed']);

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
      const formData = {
        'id': this.id,
        'title': this.loginForm.value.title,
        'description': this.loginForm.value.description,
        'promo_type': this.loginForm.value.promo_type,
        'promocode': this.loginForm.value.promocode,
        'min_order_value': this.loginForm.value.min_order_value,
        'promo_discount': this.loginForm.value.promo_discount,
        'status': this.loginForm.value.statusKey,
        'start_date': start1,
        'end_date': end1,
        'assignment': this.loginForm.value.assignment
      }
      console.log(formData)
      this.api
        .putReqAuth("admin/discount/edit-discount", formData).subscribe(
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
      const formData = {
        'title': this.loginForm.value.title,
        'description': this.loginForm.value.description,
        'promo_type': this.loginForm.value.promo_type,
        'promocode': this.loginForm.value.promocode,
        'min_order_value': this.loginForm.value.min_order_value,
        'promo_discount': this.loginForm.value.promo_discount,
        'status': this.loginForm.value.statusKey,
        'start_date': start1,
        'end_date': end1,
        'assignment': this.loginForm.value.assignment
      }
      console.log(formData)
      this.api
        .postReqAuth("admin/discount/add-discount", formData).subscribe(
          res => this.success(res),
          err => this.error(err),
          () => (this.loader = false)
        );
    } else {
      this._util.markError(this.loginForm);
    }
  }

  isNumber(event) {

    var str = event.target.value;
    if (str>this.max) {
        return false;
    }
    return true;
}
changeNumber(e){
  var str = e.target.value;
  var input = e.target;
    var value = Number(input.value);
    var key = Number(e.key);
    if (Number.isInteger(key)) {
      value = Number("" + value + key);
      if (value > this.max) {
        return false;
      }
      this.loginForm.get('promo_discount').patchValue(str)
    }

}
  changeType(event) {

    this.loginForm.get('promo_discount').patchValue('');
    console.log(event.target.value);
    if (event.target.value == 2) {
      this.min=0;
      this.max=100;
      this.loginForm.get('promo_discount').setValidators([Validators.required, rangeValidator(0, 100)]);
      this.loginForm.get('promo_discount').updateValueAndValidity();
      this.placeHolderText = "Percentage Discount";
      this.FORM_ERROR.promo_discount.range = ERROR_MESSAGES.RANGE_PERCENTAGE;
    } else {
      this.loginForm.get('promo_discount').setValidators([Validators.required, rangeValidator(0, 10000)]);
      this.loginForm.get('promo_discount').updateValueAndValidity();
      this.placeHolderText = "Discount Price";
      this.FORM_ERROR.promo_discount.range = ERROR_MESSAGES.RANGE;
      this.min=0;
      this.max=10000;
    }

  }
  
  success(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    if (res.status == true) {
      this._api.showNotification('success', res.message);
      this.router.navigate(['theme/discount'])

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