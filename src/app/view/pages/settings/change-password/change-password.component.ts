import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {

  
  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private api: LoginService,
    private ls: LoaderService,
    private _util: CommonUtil,
    private router: Router) {


  }
  FORM_ERROR = {
    oldpassword: {
      required: ERROR_MESSAGES.OLD_PASSWORD_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PASSWORD_LENGTH}`,
      pattern: ERROR_MESSAGES.PASSWORD_REQUIRED,
    },
    newpassword: {
      required: ERROR_MESSAGES.PASSWORD_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PASSWORD_LENGTH}`,
      pattern: ERROR_MESSAGES.PASSWORD_REQUIRED,
    },
    confirmpassword: {
      required: ERROR_MESSAGES.CONFIRM_PASSWORD,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PASSWORD_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    }
  };

  createForm() {
    this.loginForm = this._fb.group({
      oldpassword: ["", [Validators.required,Validators.pattern(Regex.spaces)]],
      newpassword: ["", [Validators.required,Validators.pattern(Regex.spaces)]],
      confirmpassword: ["", [Validators.required,Validators.pattern(Regex.spaces)]],
    });
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



  submit() {
    if (this.loginForm.valid) {

      this.loader = true;
    } else {
      this._util.markError(this.loginForm);
    }

  }
}
