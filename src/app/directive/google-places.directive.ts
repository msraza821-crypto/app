
import { Directive, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';


// declare var google:any;

@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(elRef: ElementRef) {
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
    //alert();
  }

  getFormattedAddress(place) {
    console.log(" google-place ===  ", place)
    //console.log(place.address_components.geomerty.location.lat());
    //@params: place - Google Autocomplete place object
    //@returns: location_obj - An address object in human readable format
    let location_obj = {};

    let state = place.address_components.find((component) =>
        component.types.includes('administrative_area_level_1')
      );
      let city = place.address_components.find((component) =>
        component.types.includes("locality")
      );
      let country = place.address_components.find((component) =>
        component.types.includes("country")
      );

      
      if(state && state.long_name){

        location_obj['state'] =  state.long_name
        
      }else{

        location_obj['state'] = ''
      }

      if(city && city.long_name){

        location_obj['city'] = city.long_name
        
      }else{

        location_obj['city'] = ''
      }

      if( country && country.long_name){

        location_obj['country'] = country.long_name
      
      }else{
        location_obj['country'] = ''

      }
      

      location_obj['formatted_address'] = place.formatted_address;
      location_obj['place_id'] = place.place_id;
      location_obj['lat'] = place.geometry.location.lat();
      location_obj['lng'] = place.geometry.location.lng();
      

      console.log("location_obj =========== ", location_obj );
      
   
    return location_obj;
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.




    setTimeout(() => {
      let { google } = window as any
      console.log(google)
      if (google) {

        const autocomplete = new google.maps.places.Autocomplete(this.element);
        //Event listener to monitor place changes in the input
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
          //Emit the new address object for the updated place
          this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
        });
      }
    }, 1000)
  }



}
