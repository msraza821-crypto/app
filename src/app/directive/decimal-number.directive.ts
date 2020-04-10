
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyDeciNumber]'
})
export class DecimalNumberDirective {

  private regex: RegExp = new RegExp('(\\d+)(\\.)?(\\d+)?');
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.shiftKey == true) {
      event.preventDefault();
    }

    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190) {

    } else {
      event.preventDefault();
    }
    const val=this.el.nativeElement.value
    if(val.indexOf('.')!==-1 && event.keyCode==190){
      event.preventDefault();
    }
  }

}
