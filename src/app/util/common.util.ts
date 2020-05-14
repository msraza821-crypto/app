import { FormGroup, FormControl } from '@angular/forms';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// import * as moment from 'moment';

@Injectable()
export class CommonUtil {


    constructor() {

    }


    public errorMessage(formControl: FormControl, errorMessage) {
        if (formControl.errors && formControl.dirty && formControl.touched) {
            
            const errors = <Array<string>>Object.keys(formControl.errors);
            if (errors.includes('required')) {
                return errorMessage.required;
            }
            if (errors.includes('maxlength')) {
                return errorMessage.maxlength;
            }
            if (errors.includes('minlength')) {
                return errorMessage.minlength;
            }
            if (errors.includes('pattern')) {
                return errorMessage.pattern;
            }
            if (errors.includes('email')) {
                return errorMessage.email;
            }
            if (errors.includes('matchedPassword')) {
                return errorMessage.matchedPassword;
            }
            if (errors.includes('range')) {
                return errorMessage.range;
            }

        } else {
            return '';
        }
    }

    markError(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((control) => {
            formGroup.get(control).markAsDirty();
            formGroup.get(control).markAsTouched();
        });
    }

    /**
     * @description Sort array of objects with key
     * @param items Array
     * @param key
     */
    sortObjectsNumber(items: Array<any>, key: string) {
        items.sort((a, b) => {
            const one = parseInt(a[key], 10);
            const two = parseInt(b[key], 10);
            if (one < two) {
                return -1;
            }
            if (one > two) {
                return 1;
            }
            return 0;
        });
        return items;
    }


    findIndex(data: Array<any>, key, value) {
        return data.findIndex((item) => {
            if (item[key] === value) {
                return true;
            } else {
                return false;
            }
        });
    }

    message(message: string) {
        //this.appSer.addSnackBar({ message });
    }

    isToday(date: Date) {
        const currentTime = new Date();
        const prevDate = new Date(date);
        if (date && (prevDate.getTime() - currentTime.getTime()) > 86400000) {
            return true;
        } else {
            return false;
        }
    }


    notificationDate(date: Date): string | Date {

        let diffrence = (new Date().getTime() - new Date(date).getTime()) / 1000;
        if (diffrence < 60) {
            diffrence = Math.floor(diffrence);
            return `${diffrence} seconds ago`;
        } else if (diffrence > 59 && diffrence < 3600) {
            diffrence = Math.floor(diffrence / 60);
            return `${diffrence} minutes ago`;
        } else if (diffrence > 3599 && diffrence < 86400) {
            diffrence = Math.floor(diffrence / 3600);
            return `${diffrence} hours ago`;
        } else if (diffrence >= 86400 && diffrence < 2592000) {
            diffrence = Math.floor(diffrence / 86400);
            return `${diffrence} days ago`;
        } else {
            return date;
        }
    }



  keyPress(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {    
      
      
        event.preventDefault();
    }
  
}

}
