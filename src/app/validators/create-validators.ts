import { ValidatorFn, AbstractControl } from '@angular/forms';

export default function createValidator(params:{regex: RegExp, message:string, type:string}): ValidatorFn{
        return (control: AbstractControl): {[key: string]: any} | null => {
          const isValid = params.regex.test(control.value);
         
          console.log( params.type, isValid )
          return !isValid ? {[params.type]: params.message} : null;
        };
      }