import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { Store, select } from '@ngrx/store';
import * as AppActions from "src/app/store/actions/app.actions";
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  show: boolean = false;
  errorMessage: string = "";
  isRemberMeChecked: boolean = false;
  stateSub: Subscription;
  constructor(
    private _fb: FormBuilder,
    private store: Store<any>,
    private _util: CommonUtil,
    private _api: HttpService,
    private appSer:AppService,
    private router: Router) {
  }
  FORM_ERROR = {
    email: {
      required: ERROR_MESSAGES.EMAIL_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.EMAIL_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT_EMAIL,
    },
    password: {
      required: ERROR_MESSAGES.PASSWORD_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.PASSWORD_LENGTH}`,
      minLength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.PASSWORD_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    }
  };

  createForm() {
    var email = localStorage.getItem('email');
    var password = localStorage.getItem('password');
    if (email && password) {
      this.isRemberMeChecked = true;
    }
    this.loginForm = this._fb.group({
      email: [email, [Validators.required, Validators.pattern(Regex.email),Validators.maxLength(CONFIG.EMAIL_LENGTH)]],
      password: [password, [Validators.required, Validators.pattern(Regex.spaces),Validators.minLength(CONFIG.PASSWORD_MIN),Validators.maxLength(CONFIG.PASSWORD_MAX)]],
      rememberMe: [this.isRemberMeChecked]
    });
  }
  userVaild:boolean=false;
  ngOnInit() {
    this.stateSub = this.store.pipe(select('applicationState')).subscribe(
      (appState) => {
        //alert();
        console.log(appState)
        if(appState && appState.user){
       
        }else{
          if (localStorage.getItem('chicbeetoken')) {
          this.userVaild=true
        }
      }

        
      });
      if(this.userVaild==true){
        this.router.navigate(['/theme']);
      }
    this.createForm();
  }
  get email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }
  get rememberMe(): FormControl {
    return this.loginForm.get("rememberMe") as FormControl;
  }
  // click event function toggle
  passwordHideShow(userInput) {
    this.show = !this.show;
  }

  submit() {
    if (this.loginForm.valid) {
      this.loader = true;
     
      this._api
        .postReqUnauth("admin/login", this.loginForm.value)
        .subscribe(
          res => this.success(res),
          err => this.error(err),
          () => (this.loader = false)
        );

    } else {
      this._util.markError(this.loginForm);
    }

  }
  success(res: any) {

    if (res.status == true) {
      if (this.loginForm.value.rememberMe == true) {
       // alert('pppp')
        localStorage.setItem('email', this.loginForm.value.email);
        localStorage.setItem('password', this.loginForm.value.password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      console.log(res.result)
      this.store.dispatch(new AppActions.UserSignup(res.result));
      localStorage.setItem("chicbeetoken", res.result.token);
      this.router.navigate(['/theme']);
    } else {
      this.errorMessage = res.message;
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
    }
  }
  error(res: any) {
    this.errorMessage = res.message;
    setTimeout(() => {
      this.errorMessage = "";
    }, 5000);
  }
}
