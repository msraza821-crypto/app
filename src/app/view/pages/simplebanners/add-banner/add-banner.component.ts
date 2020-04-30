import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormArray,FormBuilder,Validators} from  "@angular/forms";
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';
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
  page: number = 1;
  limit=10;
  totalRec=50;


  url1 = ''; url: string = '';
  message: string = '';
  keyValue: boolean = false;

  constructor(private fb:FormBuilder,
    private _util: CommonUtil,
    private api:HttpService,
    private spinner:NgxSpinnerService,
    private route:ActivatedRoute,
    private router:Router,
    private _api:AppService
    
    ) {
   this.spinner.show();
    this.api.getReqAuthBrands("admin/product/brand-list").pipe().subscribe(res=>{
      if(res)
      {this.spinner.hide()
        this.brands=res.result;
        this.showPage=true;
        console.log(this.brands)
      this.createForm()
      this.getCategory()
      
    
      }
    
      
    });
console.log(ERROR_MESSAGES.SUBCATEGORY_REQUIRED)

  }
  createForm()
  {
    this.bannerForm=this.fb.group({
      title:['',[Validators.required,Validators.pattern(Regex.SPACESTARTEND) ,Validators.maxLength(CONFIG.NAME_LENGTH_TITLE),Validators.minLength(CONFIG.NAME_MINLENGTH)]],

      category:['',[Validators.required]],
      sub_category:['',[Validators.required]],
      status:['',[Validators.required]],
      display_order:['',[Validators.required]]
    
    });
  }

  imageFormats: Array<string> = ['jpeg','png','jpg'];

  FORM_ERROR = {
    title: {
      required: ERROR_MESSAGES.BANNER_TITLE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_LENGTH_TITLE}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
     
    },
  
    category: {
      required: ERROR_MESSAGES.CATEGORY_REQUIRED,
   
    },
    sub_category: {
      required: ERROR_MESSAGES.SUBCATEGORY_REQUIRED
    },
    display_order: {
      required: ERROR_MESSAGES. DISPLAY_ORDER_REQUIRED
    },
   status:{
     required:ERROR_MESSAGES.STATUS_REQUIRED
    }
 };

id;

selectedProduct=[]

onFilterChange(eve: any,id) {
this.productCompare(id)
}

productCompare(id:any)
{
  
  for(let i=0;i<this.selectedProduct.length;i++)
  {
    if(id==this.selectedProduct[i])
    {
      const index = this.selectedProduct.indexOf(this.selectedProduct[i], 0);
      if (index > -1) {
        this.selectedProduct.splice(index, 1);
        return;
              }

    }
  }

      this.selectedProduct.push(id)
      console.log(this.selectedProduct)
    

  }

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


  get title(): FormControl {
    return this.bannerForm.get("title") as FormControl;
   }
  // get minimum_value(): FormControl {
  //   return this.bannerForm.get("minimum_value") as FormControl;
  // }
  // get available_on(): FormControl {
  //   return this.bannerForm.get("available_on") as FormControl;
  // }
  // get discount_type(): FormControl {
  //   return this.bannerForm.get("discount_type") as FormControl;
  // }
  // get discount_value(): FormControl {
  //   return this.bannerForm.get("discount_value") as FormControl;
  // }
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
  get  status ():FormControl
  {
    return this.bannerForm.get("status") as FormControl 
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
    .getReqAuth("admin/banner/category-list?parent_id="+0)
    .subscribe(
      res =>{
        console.log('categort',res)
  this.categoryList=res.result
  console.log('categorlist',this.categoryList)
      },
      err => this.error(err),
      () => (this.loader = false)
    );
    }
  subCategoryList;
 getSubcategory(){
   
    this.api.getReqAuth("admin/banner/category-list?parent_id="+this.bannerForm.value.category)
    
    .subscribe(
      res => {
        this.subCategoryList=res.result
        console.log(this.subCategoryList)
      },
      err => this.error(err),
      () => (this.loader = false)
    );
  }
  onSubmit()
  {
    if(this.bannerForm.valid)
    {
      this.spinner.show();
      const formData = new FormData();
    formData.append('title', this.bannerForm.value.title.trim());
    formData.append('banner_type','1');
   formData.append('display_order',this.bannerForm.value.display_order)
   formData.append('image', this.url1);
   formData.append('status',this.bannerForm.value.status)
    formData.append('category', this.bannerForm.value.category);
    formData.append('sub_category', this.bannerForm.value.sub_category);
     this.api.postReqAuth("admin/banner/add-banner",formData).subscribe(
      res =>this.success(res),
      err => this.error(err),
      () => (this.loader = false)


    );
    
    }
    else
    this._util.markError(this.bannerForm);

    }
    successMessage:string="";
    success(res) {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      if (res.status == true) {
        this._api.showNotification( 'success', res.message );
          this.router.navigate(['theme/simplebanners'])
       
      } else {
        this._util.markError(this.bannerForm);
        this._api.showNotification( 'error', res.message );
      }
  
    }
  keyPress(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {    
      
        event.preventDefault();
    }
}
productList=[];

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

errorMessage;
choosefile="No choose file...";
onSelectFile(event) {
  this.keyValue = true;
  if (event.target.files && event.target.files[0]) {
    var mimeType = event.target.files[0].type;
    var file = event.target.files[0];
    this.choosefile=event.target.files[0].name;

    const width = file.naturalWidth;
    const height = file.naturalHeight;

    window.URL.revokeObjectURL(file.src);
    //  var checkimg = file.toLowerCase();
    const type = file.type.split('/');
    if (type[0] === 'image' && this.imageFormats.includes(type[1].toLowerCase())) {

    } else {
      this.errorMessage = "Please use proper format of image like jpeg,jpg and png only.";
      setTimeout(() => {
        this.loader = false;
        this.keyValue = false;
        this.errorMessage = "";
      }, 3000)
      return false;
    }


    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event: any) => { // called once readAsDataURL is completed
     // this.url = event.result;
      this.url = event.target.result;
    }


    this.url1 = event.target.files[0];
    console.log(this.url1)


    setTimeout(() => {
      this.loader = false;
      this.keyValue = false;
      this.errorMessage = "";
    }, 3000)
    this.loader = true;

  }
}
  sub_cate(event) {
    const value = event;
    this.api
      .getReqAuth("admin/product/category-list?parent_id=" + value).subscribe(
        res => this.successCategorySub(res),
        err => this.error(err),
        () => (this.loader = false)
      );
  }
  successCategorySub(res){
    if(res.status==true){
      this.subCategoryList=res.result
    }
  }
viewBanner(){
  this.spinner.show();
  this.api
  .getReqAuth("admin/banner/banner-detail?id="+this.id)
  .subscribe(
    res => this.successView(res),
    err => this.error(err),
    () => (this.loader = false)
  );
}

successView(res){
  if(res.status==true){
  var data= res.result;
  if(data['category']!=null){
  this.sub_cate(data['category']);
  }
  this.getCategory();
  Object.keys(this.bannerForm.controls).forEach((control) => {

    this.bannerForm.get(control).patchValue(data[control]);

  });
  this.url=data.image;

  var str = this.url.split('/');
  this.choosefile = str[str.length - 1];
  // this.bannerForm.get('title').patchValue('shabbir');
  // this.bannerForm.get('minimum_value').patchValue(1223);
  // this.bannerForm.get('available_on').patchValue('brand');

  // this.bannerForm.get('discount_type').patchValue("flat");
  // this.bannerForm.get('discount_value').patchValue(1223);
  // this.bannerForm.get('minimum_value').patchValue(1223);
  // this.bannerForm.get('minimum_value').patchValue(1223);
  // this.bannerForm.get('minimum_value').patchValue(1223);


  }
}

error(res){
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 1000);

  this._api.showNotification( 'error', res.message );
}

update()
{
  if(this.bannerForm.valid)
  {
    this.spinner.show();
    const formData = new FormData();
    formData.append('id',this.id);
  formData.append('title', this.bannerForm.value.title.trim());
  formData.append('banner_type','1');
 formData.append('display_order',this.bannerForm.value.display_order)
 if(this.url1){
 formData.append('image', this.url1);
 }
 formData.append('status',this.bannerForm.value.status)
  formData.append('category', this.bannerForm.value.category);
  formData.append('sub_category', this.bannerForm.value.sub_category);
   this.api.putReqAuth("admin/banner/edit-banner",formData).subscribe(
    res =>this.success(res),
    err => this.error(err),
    () => (this.loader = false)


  );
  
  }
  else
  this._util.markError(this.bannerForm);

}
counter(i: number) {
  return new Array(i);
}
}