import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { Store, select } from '@ngrx/store';
import * as AppActions from "src/app/store/actions/app.actions";
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  stateSub:Subscription;
  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(
    private _fb: FormBuilder,
    private api: HttpService,
    private _util: CommonUtil,
    private store: Store<any>,
    private spinner: NgxSpinnerService,
    private router: Router) {


  }
  FORM_ERROR = {
    email: {
      required: ERROR_MESSAGES.EMAIL_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.EMAIL_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    firstname: {
      required: ERROR_MESSAGES.NAME_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    lastname: {
      required: ERROR_MESSAGES.NAME_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    }
  };

  createForm() {
    this.loginForm = this._fb.group({
      email: [this.userData.email, [Validators.required, Validators.pattern(Regex.email),Validators.maxLength(CONFIG.EMAIL_LENGTH)]],
      firstname: [this.userData.first_name, [Validators.required, Validators.pattern(Regex.spacecharacter),Validators.maxLength(CONFIG.NAME_LENGTH)]],
      lastname: [this.userData.last_name, [Validators.required, Validators.pattern(Regex.spacecharacter),Validators.maxLength(CONFIG.NAME_LENGTH)]],

    });
  }
  userData:any={};
  ngOnInit() {
    this.stateSub = this.store.pipe(select('applicationState')).subscribe(
      (appState) => {
        //alert();
        console.log(appState)
        if(appState && appState.user){
           this.userData=appState.user; 
        
      }

        
      });
    this.createForm();
  }
  get email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  get firstname(): FormControl {
    return this.loginForm.get("firstname") as FormControl;
  }
  get lastname(): FormControl {
    return this.loginForm.get("lastname") as FormControl;
  }
  keyValue: boolean = false;
  message: string = '';
  url: string = '';
  url1: string = '';

  onSelectFile(event) {
    this.keyValue = true;
    if (event.target.files && event.target.files[0]) {
      var mimeType = event.target.files[0].type;
      var file = event.target.files[0];
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.result;
      }


      this.url1 = event.target.files[0];
      console.log(this.url1)


      setTimeout(() => {
        this.loader = false;
        this.keyValue = false;
      }, 3000)
      this.loader = true;

    }
  }

  submit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      const formData = new FormData();
      formData.append('profile_picture', this.url1);
      formData.append('first_name', this.loginForm.value.firstname);
      formData.append('last_name', this.loginForm.value.lastname);
      formData.append('email',this.userData.email);
      formData.append('admin_id',this.userData.id);
      this.api
        .putReqAuth("admin/profile-edit", formData)
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
      console.log(res.result)
      this.successMessage=res.message;
      setTimeout(() => {
        this.errorMessage = "";
        this.successMessage='';
      }, 5000);
      this.store.dispatch(new AppActions.UserSignup(res.result));
      //localStorage.setItem("chicbeetoken", res.result.token);
    //  this.router.navigate(['/theme/settings']);
    } else {
      this.errorMessage = res.message;
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
    }
  }
  error(res: any) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.errorMessage = res.message;
    setTimeout(() => {
      this.errorMessage = "";
    }, 5000);
  }
}
