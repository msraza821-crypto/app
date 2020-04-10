import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ERROR_MESSAGES, CONFIG,Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

  loader = false;
  CONFIG = CONFIG;
  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private api: LoginService,
    private ls: LoaderService,
    private _util:CommonUtil,
    private router: Router) {
      

     }
     FORM_ERROR = {
      email: {
        required: ERROR_MESSAGES.EMAIL_REQUIRED,
        maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.EMAIL_LENGTH}`,
        pattern: ERROR_MESSAGES.INVALID_INPUT,
      },
      name: {
        required: ERROR_MESSAGES.NAME_REQUIRED,
        maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_LENGTH}`,
        pattern: ERROR_MESSAGES.INVALID_INPUT,
      }
    };

    createForm() {
      this.loginForm = this._fb.group({
        email: ["", [Validators.required, Validators.pattern(Regex.email)]],
        name: ["", [Validators.required,Validators.pattern(Regex.spacecharacter)]],

      });
    }
  ngOnInit() {
   this.createForm();
  }
  get email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  get name(): FormControl {
    return this.loginForm.get("name") as FormControl;
  }
  

  submit() {
    if (this.loginForm.valid) {

    this.loader=true;
    }else{
      this._util.markError(this.loginForm);
    }

  }
}
