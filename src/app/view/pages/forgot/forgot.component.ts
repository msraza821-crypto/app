import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {


  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _api: HttpService,
    
    private _util: CommonUtil,
    private router: Router) {


  }
  FORM_ERROR = {
    email: {
      required: ERROR_MESSAGES.EMAIL_REQUIRED_FORGOT,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.EMAIL_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT_EMAIL,
    }
  };

  createForm() {
    this.loginForm = this._fb.group({
      email: ["", [Validators.required, Validators.pattern(Regex.email)]]
    });
  }
  ngOnInit() {
    this.createForm();
  }
  get email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }



  submit() {
    if (this.loginForm.valid) {

      this.loader = true;
      this._api
      .postReqUnauth("admin/forgot-password", this.loginForm.value)
      .subscribe(
        res => this.success(res),
        err => this.error(err),
        () => (this.loader = false)
      );
    } else {
      this._util.markError(this.loginForm);
    }

  }
  errorMessage:string="";
  successMessage:string="";
  success(res: any) {

    if (res.status == true) {
      this.successMessage = res.message;
    
      setTimeout(() => {
        this.errorMessage = "";
        this.successMessage ="";
      }, 5000);
    } else {
      this.errorMessage = res.message;
      setTimeout(() => {
        this.errorMessage = "";
        this.successMessage ="";
      }, 5000);
    }
  }
  error(res: any) {
    this.errorMessage = res.message;
    setTimeout(() => {
      this.errorMessage = "";
        this.successMessage ="";
    }, 5000);
  }
}