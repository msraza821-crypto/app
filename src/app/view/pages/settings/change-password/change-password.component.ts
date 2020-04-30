import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {

  
  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  showOld:boolean=false;
  showNew:boolean=false;
  showConfirm:boolean=false;
  constructor(
    private _fb: FormBuilder,
    private api:HttpService,    
    private _util: CommonUtil,
    private spinner: NgxSpinnerService,
    private _api:AppService,
    private router: Router) {


  }
  FORM_ERROR = {
    oldpassword: {
      required: ERROR_MESSAGES.OLD_PASSWORD,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PASSWORD_LENGTH}`,
      pattern: ERROR_MESSAGES.PASSWORD_REQUIRED,
    },
    newpassword: {
      required: ERROR_MESSAGES.NEWPASSWORD_REQUIRED,
           
      pattern: ERROR_MESSAGES.PASSWORD_REGEX,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PASSWORD_MAX}`,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.PASSWORD_MIN}`,
  },
  confirmpassword: {
      required: ERROR_MESSAGES.CONFIRM_PASSWORD,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PASSWORD_MAX}`,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.PASSWORD_MIN}`,
      pattern: ERROR_MESSAGES.PASSWORD_REGEX, matchedPassword: ERROR_MESSAGES.PASSWORD_CONFIRMPASSWORD_MISMATCH
  }};

  createForm() {
    this.loginForm = this._fb.group({
      oldpassword: ["", [Validators.required,Validators.pattern(Regex.spaces)]],
      newpassword: ["", [Validators.required,Validators.required,Validators.minLength(8), Validators.maxLength(15), Validators.pattern(Regex.password), Validators.pattern(Regex.spaces)]],
      confirmpassword: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(15), Validators.pattern(Regex.password), Validators.pattern(Regex.spaces)]],

    },
    { validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group




      if (group.controls.confirmpassword.value !== "") {
          let pass = group.controls.newpassword.value;
          let confirmPass = group.controls.confirmpassword.value;

          return pass === confirmPass ? null : { notSame: true }
      }
  }
  passwordHideShowOld(userInput) {
    this.showOld = !this.showOld;
  }
  passwordHideShowNew(userInput) {
    this.showNew = !this.showNew;
  }
  passwordHideShowConfirm(userInput) {
    this.showConfirm = !this.showConfirm;
  }

  ngOnInit() {
    this.createForm();
  }

  get oldpassword(): FormControl {
    return this.loginForm.get("oldpassword") as FormControl;
  }
  get newpassword(): FormControl {
    return this.loginForm.get("newpassword") as FormControl;
  }
  get confirmpassword(): FormControl {
    return this.loginForm.get("confirmpassword") as FormControl;
  }

  errorMessage:string='';

  submit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      var data={'current_password':this.loginForm.value.oldpassword
      ,'password':this.loginForm.value.newpassword,
      'confirm_password':this.loginForm.value.confirmpassword
      };
     this.api
      .putReqAuth("admin/change-password",data )
      .subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );

    } else {
      this._util.markError(this.loginForm);
    }

  }
  successMessage:string="";
  success(res: any) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    if (res.status == true) {
      this._api.showNotification( 'success', res.message );
     this.createForm();

    } else {
      this._api.showNotification( 'error', res.message );
    }
  }
  error(res: any) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this._api.showNotification( 'error', res.message );
  }
}
