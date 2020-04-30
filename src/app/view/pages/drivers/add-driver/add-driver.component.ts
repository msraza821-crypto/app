import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormArray,FormBuilder,Validators} from  "@angular/forms";
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  closeResult = '';
  driverForm:FormGroup;
selectedValue=[];
CONFIG = CONFIG;

  brands=[];
  inlineCheckbox='checkbox'
  
  


  url1 = ''; url: string = '';
  message: string = '';
  keyValue: boolean = false;

  constructor(private fb:FormBuilder,
    private _util: CommonUtil,
    private api:HttpService,
    private spinner:NgxSpinnerService,
    private route:ActivatedRoute,
    private router:Router
    
    ) {
 
      this.createForm()

      this.driverForm.get('country_code').patchValue('+974')
     
    
      // }
    
      
    // });
console.log(ERROR_MESSAGES.SUBCATEGORY_REQUIRED)

  }
  createForm()
  {
    this.driverForm=this.fb.group({
      name:['',[Validators.required,Validators.maxLength(CONFIG.NAME_MAX_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
      email:['',[Validators.required,Validators.pattern(Regex.email)]],
      license:['',[Validators.required,Validators.maxLength(CONFIG.MOBILE_LENGTH),Validators.minLength(CONFIG.MOBILE_MIN_LENGTH)]],
      country_code:[''],
      mobile:['',[Validators.required,Validators.maxLength(CONFIG.MOBILE_LENGTH),Validators.minLength(CONFIG.MOBILE_MIN_LENGTH)]],
      plate_number:['',[Validators.required,Validators.maxLength(CONFIG.MAX_PLAT_NUMBER),Validators.minLength(CONFIG.MIN_PLATE_NUMBER)]],
      vehicle_type:['',[Validators.required]],
      address:['',[Validators.required]]
      
      
    
    });
  }

  imageFormats: Array<string> = ['jpeg','png','jpg'];

  FORM_ERROR = {
    name: {
      required: ERROR_MESSAGES.DRIVER_NAME_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_MAX_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    
    email: {
      required: ERROR_MESSAGES.EMAIL_REQUIRED,
      pattern: ERROR_MESSAGES.INVALID_INPUT_EMAIL,
   
    },
    mobile: {
      required: ERROR_MESSAGES.MOBILE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.MOBILE_LENGTH}`,
  
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.MOBILE_MIN_LENGTH}`

    },
    plate_number: {
      required: ERROR_MESSAGES.PLATE_NUMBER_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.MAX_PLAT_NUMBER}`,
  
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.MIN_PLATE_NUMBER}`

    },
  vehicle_type:{
    required:ERROR_MESSAGES.VEHICLE_TYPE_REQUIRED
  },
  address:{
    required:ERROR_MESSAGES.PROPERTY_ADDRESS_REQUIRED,
    maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.ADDRESS_LENGTH}`,
  
    minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.ADDRESS_LENGTH}`
  },
  license:{
    required:ERROR_MESSAGES.LICENSE_REQUIRED,
    maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.MOBILE_LENGTH}`,
  
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.MOBILE_MIN_LENGTH}`
  }
   
 };

id;

selectedProduct=[]

onFilterChange(eve: any,id) {

}



ngOnInit()
{
  this.route.params.subscribe(param=>
    {
      if(param && param['id'])
      {

this.id=param.id
console.log(this.id)
this.myPatchValue()


      }
    })
   
}

  checked = "";
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;


  get name(): FormControl {
    return this.driverForm.get("name") as FormControl;
   }
 
  get email(): FormControl {
    return this.driverForm.get("email") as FormControl;
  }
  get mobile(): FormControl {
    return this.driverForm.get("mobile") as FormControl;
  }
  get country_code(): FormControl {
    return this.driverForm.get("country_code") as FormControl;
  }
  get license(): FormControl {
    return this.driverForm.get("license") as FormControl;
  }
  get plate_number()
  {
    return this.driverForm.get("plate_number") as FormControl;
  }
  get  address ():FormControl
  {
    return this.driverForm.get("address") as FormControl 
  }
  get  vehicle_type ():FormControl
  {
    return this.driverForm.get("vehicle_type") as FormControl 
  }


  myPatchValue()
  {
    this.driverForm.get('name').patchValue('shabbir')
    this.driverForm.get('email').patchValue('shabbir@gmail.com')
    this.driverForm.get('mobile').patchValue('27376324472389')

    this.driverForm.get('license').patchValue('123123432')
    this.driverForm.get('plate_number').patchValue('1233322')
    this.driverForm.get('vehicle_type').patchValue('2 Wheeler')
    this.driverForm.get('address').patchValue('noida')


  }

  
  onSubmit()
  {
    

     
    if(this.driverForm.valid)
    {
          

  
    
  this.api.postReqAuth("admin/driver/add-driver",this.getFormData()

    ).subscribe(
    res =>{
      console.log(res)
    }


  );


    }
     this._util.markError(this.driverForm);


    
      

}


namePress(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);

  if (pattern.test(inputChar)) {    
    
      event.preventDefault();
  }
}
discountType='';
changeDiscountType(){
console.log('from discount change')
  if(this.driverForm.value.discount_type=='1')
  this.discountType="Enter discount value..."
  else
  this.discountType="% of Off...."
}
errorMessage:string;
onSelectFile(event) {
  this.keyValue = true;
  if (event.target.files && event.target.files[0]) {
    var mimeType = event.target.files[0].type;
    var file = event.target.files[0];


    const width = file.naturalWidth;
    const height = file.naturalHeight;

    window.URL.revokeObjectURL( file.src );
  //  var checkimg = file.toLowerCase();
    const type = file.type.split('/');
  if (type[0] === 'image' && this.imageFormats.includes(type[1].toLowerCase())) {

  }else{
    this.errorMessage = "Please use proper format of image like jpeg,jpg and png only.";
 setTimeout(() => {
      this.keyValue = false;
      this.errorMessage="";
    }, 3000)
    return false;
  } 
  
}}


numberPress(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);

  if (!pattern.test(inputChar)) {    
    
      event.preventDefault();
  }


}



getFormData()
{

    
    if(this.driverForm.valid)
    {


      let data={name:this.driverForm.value.name,
        email:this.driverForm.value.email,contact_number:this.driverForm.value.mobile,
        licence_number:this.driverForm.value.license,vehicle_type:this.driverForm.value.vehicle_type,
        address:this.driverForm.value.address,plate_number:this.driverForm.value.plate_number}
    
  return data

    }
     this._util.markError(this.driverForm);


}


update()
{
   
  console.log('updatwe')
  if(this.driverForm.valid)
  {


    let data={name:this.driverForm.value.name,
      email:this.driverForm.value.email,contact_number:this.driverForm.value.mobile,
      licence_number:this.driverForm.value.license,vehicle_type:this.driverForm.value.vehicle_type,
      address:this.driverForm.value.address,plate_number:this.driverForm.value.plate_number,
    id:this.id}
  

  
  
    this.api
    .putReqAuth("admin/driver/edit-driver", data).subscribe(
      res => {
        console.log(res)
      },
      
    );
  

  }
  else
  this._util.markError(this.driverForm)


}
}