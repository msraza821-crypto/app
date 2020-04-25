import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormArray,FormBuilder,Validators} from  "@angular/forms";
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {

  closeResult = '';
  bannerForm:FormGroup;
selectedValue=[];
CONFIG = CONFIG;
isProduct=false;
isBrand=false;
showPage=false;
  brands=[];
  inlineCheckbox='checkbox'
  loader = false;
  discountType=""


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
   this.spinner.show();
    this.api.getReqAuthBrands("admin/product/brand-list").pipe().subscribe(res=>{
      if(res)
      {this.spinner.hide()
        this.brands=res.result;
        this.showPage=true;
        console.log(this.brands)
      this.createForm()
      
    
      }
     
      
    });
console.log(ERROR_MESSAGES.SUBCATEGORY_REQUIRED)

  }
  createForm()
  {
    this.bannerForm=this.fb.group({
      title:['',[Validators.required,Validators.maxLength(CONFIG.NAME_MAX_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
      minimum_value:['',[Validators.required,Validators.pattern(Regex.pricePattern)]],
      available_on:['',[Validators.required]],
      discount_type:['',[Validators.required]],
      discount_value:['',[Validators.required,Validators.pattern(Regex.pricePattern)]],
      category:['',[Validators.required]],
      sub_category:['',[Validators.required]],
      child_category:['',[Validators.required]],
      date:['',[Validators.required]],
      display_order:'',
     brand:this.addBrandControl()
    });
  }

  imageFormats: Array<string> = ['jpeg','png','jpg'];

  FORM_ERROR = {
    title: {
      required: ERROR_MESSAGES.BANNER_TITLE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_MAX_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    minimum_value: {
      required: ERROR_MESSAGES.MINIMUM_VALUE_REQUIRED,
  
      pattern: ERROR_MESSAGES.INVALID_INPUT,
    },
    available_on: {
      required: ERROR_MESSAGES.AVAILABLE_ON_REQUIRED,
     
    },
    discount_type: {
      required: ERROR_MESSAGES.DISCOUNT_TYPE_REQUIRED,
     
    },
    discount_value: {
      required: ERROR_MESSAGES.DISCOUNT_VALUE_REQUIRED,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
     
    },
    category: {
      required: ERROR_MESSAGES.CATEGORY_REQUIRED,
   
    },
    sub_category: {
      required: ERROR_MESSAGES.SUBCATEGORY_REQUIRED
    },
    child_category: {
      required: ERROR_MESSAGES.CHILD_CATEGORY_REQUIRED
    },
    date:{
      required:ERROR_MESSAGES.INSPECTIONDATE_REQUIRED
    }
 };

id;

ngOnInit()
{
  this.route.params.subscribe(param=>
    {
      if(param && param['id'])
      {

this.id=param.id
console.log(this.id)
this.viewBanner()
      }
    })
   
}

  checked = "";
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  changeProduct()
  {
    console.log(this.bannerForm.value.available_on)
    if(this.bannerForm.value.available_on=='1')
    {
      this.isProduct=true;
      this.isBrand=false;
      this.getCategory()
      this.getProductList()
      return;
    }
    this.isBrand=true;
    this.isProduct=false;
  
  
  }
  addBrandControl()
  {
   
    const arr=this.brands.map(element=>{
      return this.fb.control(false)
    });
    return this.fb.array(arr);

  
  }
  get title(): FormControl {
    return this.bannerForm.get("title") as FormControl;
  }
  get minimum_value(): FormControl {
    return this.bannerForm.get("minimum_value") as FormControl;
  }
  get available_on(): FormControl {
    return this.bannerForm.get("available_on") as FormControl;
  }
  get discount_type(): FormControl {
    return this.bannerForm.get("discount_type") as FormControl;
  }
  get discount_value(): FormControl {
    return this.bannerForm.get("discount_value") as FormControl;
  }
  get category(): FormControl {
    return this.bannerForm.get("category") as FormControl;
  }
  get sub_category(): FormControl {
    return this.bannerForm.get("sub_category") as FormControl;
  }
  get child_category(): FormControl {
    return this.bannerForm.get("child_category") as FormControl;
  }
  get date(): FormControl {
    return this.bannerForm.get("date") as FormControl;
  }
  get brandArray()
  {
    return (this.bannerForm.get("brand")as FormArray).controls;
  }
  get  display_order ():FormControl
  {
    return this.bannerForm.get("display_order") as FormControl 
  }


  getSelectedValue()
  {
    this.selectedValue=[];
    this.brandArray.forEach((control,i)=>{
      if(control.value)
      {
        this.selectedValue.push(this.brands[i]);
      }
    });
    
  }
  categoryList;
  getCategory(){
  this.api
  .getReqAuth("admin/category/list")
  .subscribe(
    res =>{
this.categoryList=res.result.data
console.log(this.categoryList)
    },
    err => this.error(err),
    () => (this.loader = false)
  );
  }
  subCategoryList;
 getSubcategory(){
   
    this.api.getReqAuth("admin/category/list?&parent_id="+this.bannerForm.value.category)
    
    .subscribe(
      res => {
        this.subCategoryList=res.result.data;
        console.log(this.subCategoryList)
      },
      err => this.error(err),
      () => (this.loader = false)
    );
  }
  onSubmit()
  {

    var start1 = '';
    var end1 = '';
  
     if(this.bannerForm.value.date){
       start1=this.bannerForm.value.date.startDate._d;
       var startDate=new Date(start1)
        start1 =startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
       end1=this.bannerForm.value.date.endDate._d;
       var endDate=new Date(end1)
       end1 =endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate();
     }
    console.log(start1)
    console.log(end1)
    // if(this.bannerForm.valid)
    // {
    console.log(this.bannerForm.value)
    console.log(this.url1)
    console.log('json',JSON.stringify(this.selectedValue))

      this.spinner.show();
      const formData = new FormData();
      formData.append('title', this.bannerForm.value.title);
      formData.append('banner_type',this.bannerForm.value.display_order);
     formData.append('display_order','5')
    //  formData.append('image', this.url1);
      // formData.append('available_on', this.bannerForm.value.available_on);
      // formData.append('discount_type', this.bannerForm.value.discount_type);
      // formData.append('discount_value', this.bannerForm.value.discount_type);
      // formData.append('minimum_value', this.bannerForm.value.minimum_value);
      // formData.append('category', this.bannerForm.value.category);
      // formData.append('sub_category', this.bannerForm.value.sub_category);
      // formData.append('brands',JSON.stringify(this.selectedValue) );
      
    
      // console.log('sss',formData)
       this.api.postReqAuth("admin/banner/add-banner",formData).subscribe(
        res =>{
          console.log(res)
        },
        err => this.error(err),
        () => (this.loader = false)


      );
      // this.api.getAllActivities({title:this.bannerForm.value.title,
      //                           banner_type:2,
      //                           display_order:this.bannerForm.value.display_order,
      //                           image:this.url1,
      //                           available_on:this.bannerForm.value.available_on,
      //                           minimum_value:this.bannerForm.value.minimum_value,
      //                           discount_type:this.bannerForm.value.discount_type,
      //                           discount_value:this.bannerForm.value.discount_value,
      //                           category:this.bannerForm.value.category,
      //                           sub_category:this.bannerForm.value.sub_category,
      //                           // child_category:this.bannerForm.value.child_category,
      //                           brands:this.selectedValue,
      //                           banner_start_date:start1,
      //                           banner_end_date:end1
              




      //                         })

      

    
      
      // this.api.getAllActivities(formData).pipe().subscribe(res=>{
      //   console.log('succes',res)
      //   this.spinner.hide()
      // })
    
    // this._util.markError(this.bannerForm);

    }

  keyPress(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {    
      
        event.preventDefault();
    }
}
productList;

getProductList()
{
  var url="admin/product/list"
  this.api
    .getReqAuth(url)
    .subscribe(
      res =>{
        console.log(res)
        this.productList=res.result.data;
        console.log('product',this.productList)
      },

      err => this.error(err),
      () => (this.loader = false)
    );

}

namePress(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);

  if (pattern.test(inputChar)) {    
    
      event.preventDefault();
  }
}
changeDiscountType(){
console.log('from discount change')
  if(this.bannerForm.value.discount_type=='1')
  this.discountType="Enter discount value..."
  else
  this.discountType="% of Off...."
}
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
    return false;
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
      this.errorMessage="";
    }, 3000)
    this.loader = true;

  }
}
errorMessage

viewBanner(){
  this.spinner.show();
  this.api
  .getReqAuth("admin/brand/detail?id="+this.id)
  .subscribe(
    res => this.successView(res),
    err => this.error(err),
    () => (this.loader = false)
  );
}
success(res) {
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 1000);
  if(res.status==true){
    this.router.navigate(['theme/brands'])
} else {
  this._util.markError(this.bannerForm);
}
}
successView(res){
  if(res.status==true){
  var data= res.result;
  this.bannerForm.get('title').patchValue('shabbir');
  this.bannerForm.get('minimum_value').patchValue(1223);
  this.bannerForm.get('available_on').patchValue('brand');
  this.changeProduct();
  this.bannerForm.get('discount_type').patchValue("flat");
  this.bannerForm.get('discount_value').patchValue(1223);
  this.bannerForm.get('minimum_value').patchValue(1223);
  this.bannerForm.get('minimum_value').patchValue(1223);
  this.bannerForm.get('minimum_value').patchValue(1223);


  }
}

error(res){
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 1000);
  this._util.markError(res.message);
}

update()
{
  var start1 = '';
  var end1 = '';

   if(this.bannerForm.value.date){
     start1=this.bannerForm.value.date.startDate._d;
     var startDate=new Date(start1)
      start1 =startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
     end1=this.bannerForm.value.date.endDate._d;
     var endDate=new Date(end1)
     end1 =endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate();
   }
  console.log(start1)
  console.log(end1)
  // if(this.bannerForm.valid)
  // {
  console.log(this.bannerForm.value)
  console.log(this.url1)
  console.log('json',JSON.stringify(this.selectedValue))

    this.spinner.show();
  //   const formData = new FormData();
  //   formData.append('title', this.bannerForm.value.title);
  //   formData.append('banner_type',this.bannerForm.value.display_order);
  //  formData.append('display_order','5')
  // //  formData.append('image', this.url1);
  // //   formData.append('available_on', this.bannerForm.value.available_on);
  // //   formData.append('discount_type', this.bannerForm.value.discount_type);
  // //   formData.append('discount_value', this.bannerForm.value.discount_type);
  // //   formData.append('minimum_value', this.bannerForm.value.minimum_value);
  // //   formData.append('category', this.bannerForm.value.category);
  // //   formData.append('sub_category', this.bannerForm.value.sub_category);
  // //   formData.append('brands',JSON.stringify(this.selectedValue) );
    
  
  //   // console.log('sss',formData)
  //    this.api.postReqAuth("admin/banner/add-banner",formData).subscribe(
  //     res =>{
  //       console.log(res)
  //     },
  //     err => this.error(err),
  //     () => (this.loader = false)


  //   );
  this.api.getAllActivities({title:this.bannerForm.value.title,
    banner_type:2,
    display_order:7,
    // image:this.url1,
    available_on:this.bannerForm.value.available_on,
    minimum_value:this.bannerForm.value.minimum_value,
    discount_type:this.bannerForm.value.discount_type,
    discount_value:this.bannerForm.value.discount_value,
    category:this.bannerForm.value.category,
    sub_category:this.bannerForm.value.sub_category,
    // child_category:this.bannerForm.value.child_category,
    brands:this.selectedValue,
    banner_start_date:start1,
    banner_end_date:end1





  }).pipe().subscribe(res=>{
console.log('succes',res)
this.spinner.hide()
})
  
  // this._util.markError(this.bannerForm)
}
}