import { AbstractControl, ValidatorFn } from '@angular/forms';



export function rangeValidator(min: number, max: number): ValidatorFn {

    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const value = parseInt(control.value, 10);
        console.log(control.value , min , max )

        if (control.value !== undefined && (isNaN(value) || value < min || value > max)) {

            return { 'range': true };

        }else if(control.value === undefined){

            return { 'range': true };

        }

        return null;

    };

}