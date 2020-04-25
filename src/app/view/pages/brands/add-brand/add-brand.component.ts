import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: "app-add-brand",
  templateUrl: "./add-brand.component.html",
  styleUrls: ["./add-brand.component.css"]
})
export class AddBrandComponent implements OnInit {


  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  url1 = ''; url: string = '';
  message: string = '';
  keyValue: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _util: CommonUtil,
    private api: HttpService,
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute,
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
      required: ERROR_MESSAGES.DESCRIPTION_ENGLISH_REQUIRED,
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
      required: ERROR_MESSAGES.DESCRIPTION_ARABIC_REQUIRED,
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
      name: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.maxLength(CONFIG.B_NAME), Validators.minLength(CONFIG.MAX_B)]],
      descriptionen: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.maxLength(CONFIG.B_DES), Validators.minLength(CONFIG.MAX_B)]],
      namear: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.maxLength(CONFIG.B_NAME), Validators.minLength(CONFIG.MAX_B)]],
      descriptionar: ["", [Validators.required, Validators.pattern(Regex.spaces), Validators.maxLength(CONFIG.B_DES), Validators.minLength(CONFIG.MAX_B)]],
      statusKey: ["", [Validators.required]]
    });
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

  imageFormats: Array<string> = ['jpeg', 'png', 'jpg'];
  onSelectFile(event) {
    this.keyValue = true;
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
      .getReqAuth("admin/brand/detail?id=" + this.id)
      .subscribe(
        res => this.successView(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  choosefile: string = "No file chosen...";
  successView(res) {
    if (res.status == true) {
      var data = res.result;
      this.loginForm.get('name').patchValue(data.name);
      this.loginForm.get('namear').patchValue(data.name_ar);
      this.loginForm.get('descriptionen').patchValue(data.description);
      this.loginForm.get('descriptionar').patchValue(data.description_ar);
      this.loginForm.get('statusKey').patchValue(data.status);
      this.url = data.brand_image;
      var str = this.url.split('/');
      this.choosefile = str[str.length - 1];
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
        .putReqAuth("admin/brand/edit", formData).subscribe(
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

      this.spinner.show();
      const formData = new FormData();
      formData.append('brand_image', this.url1);
      formData.append('name', this.loginForm.value.name);
      formData.append('description', this.loginForm.value.descriptionen);
      formData.append('name_ar', this.loginForm.value.namear);
      formData.append('description_ar', this.loginForm.value.descriptionar);
      formData.append('status', this.loginForm.value.statusKey);
      console.log(formData)
      this.api
        .postReqAuth("admin/brand/add", formData).subscribe(
          res => this.success(res),
          err => this.error(err),
          () => (this.loader = false)
        );
    } else {
      this._util.markError(this.loginForm);
    }
  }
  errorMessage: string;
  successMessage: string;
  success(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    if (res.status == true) {
       this.successMessage=res.message;
      setTimeout(() => {
        this.errorMessage = "";
        this.successMessage = "";
        this.router.navigate(['theme/brands'])
      }, 3000);
    } else {
      this._util.markError(this.loginForm);
      this.errorMessage = res.message;
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.errorMessage = "";
      }, 2000);
    }

  }
  error(res) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this._util.markError(res.message);
  }

}