import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';
import { Store, select } from '@ngrx/store';
import * as AppActions from "src/app/store/actions/app.actions";
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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
  loginForm1:FormGroup;
  errorMessage: string = '';
  imageErrorMessage:any=ERROR_MESSAGES;
  isImageError=false;
  showOld:boolean=false;
  showNew:boolean=false;
  showConfirm:boolean=false;
  choosefile:string="No file chosen...";
  constructor(
    private _fb: FormBuilder,
    private api: HttpService,
    private _util: CommonUtil,
    private store: Store<any>,
    private _sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private _api:AppService,
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
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    lastname: {
      required: ERROR_MESSAGES.NAME_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_LENGTH}`,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    }
  };


  createForm() {
    this.loginForm = this._fb.group({
      email: [this.userData.email, [Validators.required, Validators.pattern(Regex.email),Validators.maxLength(CONFIG.EMAIL_LENGTH)]],
      firstname: [this.userData.first_name, [Validators.required, Validators.pattern(Regex.spacecharacter),Validators.maxLength(CONFIG.NAME_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
      lastname: [this.userData.last_name, [Validators.required, Validators.pattern(Regex.spacecharacter),Validators.maxLength(CONFIG.NAME_LENGTH),,Validators.minLength(CONFIG.NAME_MINLENGTH)]],

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
           this.url=this.userData.profile_picture;
          var str= this.url.split('/');
          this.choosefile=str[str.length-1];
          

        
      }

        
      });
    this.createForm();
    this.createForm1();
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


  get oldpassword(): FormControl {
    return this.loginForm1.get("oldpassword") as FormControl;
  }
  get newpassword(): FormControl {
    return this.loginForm1.get("newpassword") as FormControl;
  }
  get confirmpassword(): FormControl {
    return this.loginForm1.get("confirmpassword") as FormControl;
  }

  keyValue: boolean = false;
  message: string = '';
  url: string = '';
  url1: string = '';
  wrongFormat=false;
  newdata:string;
  imageFormats: Array<string> = ['jpeg','png','jpg'];
  onSelectFile(event) {
    this.keyValue = true;
    this.wrongFormat=false;
    this.isImageError=false;
    if (event.target.files && event.target.files[0]) {
      var mimeType = event.target.files[0].type;
      var file = event.target.files[0];
this.choosefile=event.target.files[0].name;
      const width = file.naturalWidth;
      const height = file.naturalHeight;

      window.URL.revokeObjectURL( file.src );
    //  var checkimg = file.toLowerCase();
      const type = file.type.split('/');
    if (type[0] === 'image' && this.imageFormats.includes(type[1].toLowerCase())) {

    }
    else{
      this.errorMessage = "Please use proper format of image like jpeg,jpg and png only";
      this.choosefile="No file chosen...";
      this.wrongFormat=true;
      this.url='';
      this.url1='';
      return false;
    }      
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;

      }
 
      
      
      this.url1 = event.target.files[0];
     // console.log(this.url1)
    //  alert(window.URL.createObjectURL(event.target.files[0]));
     
      setTimeout(() => {
        this.loader = false;
        this.keyValue = false;
        this.errorMessage="";
      }, 3000)
      this.loader = true;

    }
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
    return blob;
 }

  submit() {
    if (this.loginForm.valid&&!this.wrongFormat) {
      this.spinner.show();
      const formData = new FormData();
      if(this.url1){
      formData.append('profile_picture', this.url1);
      }
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
      if(this.wrongFormat)
      this.isImageError=true
      
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
      this.store.dispatch(new AppActions.UserSignup(res.result));
      //localStorage.setItem("chicbeetoken", res.result.token);
    //  this.router.navigate(['/theme/settings']);
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

  FORM_ERROR1 = {
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

  createForm1() {
    this.loginForm1 = this._fb.group({
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
  errorMessage1:string='';

  changePassword() {
    if (this.loginForm1.valid) {
      this.spinner.show();
      var data={'current_password':this.loginForm1.value.oldpassword
      ,'password':this.loginForm1.value.newpassword,
      'confirm_password':this.loginForm1.value.confirmpassword
      };
     this.api
      .putReqAuth("admin/change-password",data )
      .subscribe(
        res => this.successC(res),
        err => this.error1(err),
        () => (this.loader = false)
      );

    } else {
      this._util.markError(this.loginForm1);
    }

  }
  successMessage1:string="";
  successC(res: any) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    if (res.status == true) {
      this._api.showNotification( 'success', res.message );
     this.createForm1();
     
    } else {
      this._api.showNotification( 'error', res.message );
    }
  }
  error1(res: any) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.errorMessage1 = res.message;
    setTimeout(() => {
      this.errorMessage1 = "";
    }, 5000);
  }
}
