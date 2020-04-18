import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {


  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  showNew:boolean=false;
  showConfirm:boolean=false;
  constructor(
    private _fb: FormBuilder,
    private _api: HttpService,      
    private _util: CommonUtil,
    private _route:ActivatedRoute,
    private router: Router) {


  }
  FORM_ERROR = {
   
    password: {
      required: ERROR_MESSAGES.PASSWORD_REQUIRED,
           
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
      password: ["", [Validators.required,Validators.required,Validators.minLength(8), Validators.maxLength(15), Validators.pattern(Regex.password), Validators.pattern(Regex.spaces)]],
      confirmpassword: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(15), Validators.pattern(Regex.password), Validators.pattern(Regex.spaces)]],

    },
 
    { validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group




      if (group.controls.confirmpassword.value !== "") {
          let pass = group.controls.password.value;
          let confirmPass = group.controls.confirmpassword.value;

          return pass === confirmPass ? null : { notSame: true }
      }
  }
  id:string;
  ngOnInit() {
    this._route.params.subscribe(param => {
      if (param && param["token"]) {
        this.id=param["token"];
       
      }
      })
    this.createForm();
  }

  get password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }
  get confirmpassword(): FormControl {
    return this.loginForm.get("confirmpassword") as FormControl;
  }
  passwordHideShowNew(userInput) {
    this.showNew = !this.showNew;
  }
  passwordHideShowConfirm(userInput) {
    this.showConfirm = !this.showConfirm;
  }


  

  submit() {
    if (this.loginForm.valid) {

      this.loader = true;

      this._api
      .postReqUnauth("admin/reset-password", {password:this.loginForm.value.password,token:this.id})
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
        this.router.navigate(['/login']);
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