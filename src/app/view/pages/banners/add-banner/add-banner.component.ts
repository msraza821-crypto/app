import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormArray,FormBuilder,Validators} from  "@angular/forms";
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { rangeValidator } from 'src/app/validators/range.validator';




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
  discountType="";
  selectedProduct=[];


  url1 = ''; url: string = '';
  message: string = '';
  keyValue: boolean = false;

  displayOrder=[]


  page: number = 1;
  limit=10;
  totalRec=50;


  constructor(private fb:FormBuilder,
    private _util: CommonUtil,
    private api:HttpService,
    private spinner:NgxSpinnerService,
    private route:ActivatedRoute,
    private router:Router,
    private _api:AppService
    
    ) {
   
      this.createForm()

  }
  createForm()
  {
    this.bannerForm=this.fb.group({
      title:['',[Validators.required,Validators.maxLength(CONFIG.NAME_MAX_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
      minimum_value:['',[Validators.required, rangeValidator(0, 10000),Validators.pattern(Regex.pricePattern)]],
      available_on:['',[Validators.required]],
      discount_type:['',[Validators.required]],
      discount_value:['',[Validators.required,rangeValidator(0, 10000),Validators.pattern(Regex.pricePattern)]],
      category:['',[Validators.required]],
      sub_category:['',[Validators.required]],
      child_category:['',[Validators.required]],
      date:['',[Validators.required]],
      display_order:['',[Validators.required]],
      status:''
    //  brand:this.addBrandControl()
    });
  }
  counter()
{
  
  for(let v=1;v<=5;v++)
  {
    
    this.displayOrder[v-1]=v
  }

}
getProductBrand()
{
  this.api.getReqAuth("admin/banner/brand-products?brands="+'['+this.selectedValue+']').subscribe(res=>
    {
      if(res)
      {
        console.log(res)
      this.productList=res.result
      }
    });
  
}
getCategoryId()
{
  if(this.bannerForm.value.child_category!='')
  {
    return {id:this.bannerForm.value.child_category,type:'child_category'}
  }
  else
  {
    if(this.bannerForm.value.sub_category!='')
    return {id:this.bannerForm.value.sub_category,type:'sub_category'}
    else
    return {id:this.bannerForm.value.category,type:'category'}
    
  }
}

getProductUsingCategory(){
  var cat=this.getCategoryId()
  console.log(cat)
  if(cat!=null)
  {
    this.api.getReqAuth("admin/banner/category-products?id="+cat['id']+"&category_type="+cat['type']).subscribe(res=>
      {
        if(res)
        {console.log('product res',res)
          this. productList=res.result
        }
      });
  }

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
      range: ERROR_MESSAGES.RANGE,
  
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
      range: ERROR_MESSAGES.RANGE,
    
     
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
    },

    display_order: {
      required: ERROR_MESSAGES. DISPLAY_ORDER_REQUIRED
    }
 };

id;

ngOnInit()
{
  this.counter()
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



brandChange(event,id)
{
  this.selectedValue=this.productCompare(id,this.selectedValue)
  console.log(this.selectedValue)
}

getBrandList()
{

}
onFilterChange(eve: any,id) {

  console.log(this.selectedProduct)
  this.selectedProduct=this.productCompare(id,this.selectedProduct);
  console.log(this.selectedProduct)
}
productCompare(id:any,arr)
{
  
  for(let i=0;i<arr.length;i++)
  {
    if(id==arr[i])
    {
      const index = arr.indexOf(arr[i], 0);
      if (index > -1) {
      arr.splice(index, 1);
        return arr
              }

    }
  }

      arr.push(id)
      return arr;
    

  }

  getCurrentDate()
  {

    var start1 = '';
    var end1 = '';
  
        if(this.bannerForm.value.date)
          {
                    start1=this.bannerForm.value.date.startDate._d;
                    var startDate=new Date(start1)
                      start1 =startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
                    end1=this.bannerForm.value.date.endDate._d;
                    var endDate=new Date(end1)
                    end1 =endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate();
                    return {'start':start1,'end':end1}
         }  
     
    
    }


  checked = "";
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  changeProduct()
  {
    console.log(this.bannerForm.value.available_on)
    if(this.bannerForm.value.available_on=='2')
    {
      this.isProduct=true;
      this.isBrand=false;
      this.productList=[];
      this.getCategory()
      // this.getProductList()
    
      return;
    }
    if(this.bannerForm.value.available_on=='1')
    {
    this.isBrand=true;
    this.isProduct=false;
    this.productList=[]
  //   this.bannerForm.patchValue({
  //   category:" ",
  //   sub_category:" ",


  // child_category:" ",
  //   });



    this.spinner.show();
    this.api.getReqAuthBrands("admin/product/brand-list").pipe().subscribe(res=>{
      if(res)
      {
        this.spinner.hide()
        this.brands=res.result;
       
    
      
    
      }
     
      
    });
  }
  
  
  }
  getChecked(id)
  {
  var   flag=0;
  if(this.brandData.length>0)
  {
    for(let d of this.brandData)
    {
      if(d['id']==id)
      flag=1;
    }
    if(flag!=0)
    return true;
    else
    return false;
  }
    
  }

  getProductChecked(id)
  {
    var   flag=0;
    if(this.productData.length>0)
    {
    for(let d of this.productData)
    {
      if(d['product_id']==id)
      flag=1;
    }
    if(flag!=0)
    return true;
    else
    return false;

  }
}

  // addBrandControl()
  // {
   
  //   const arr=this.brands.map(element=>{
  //     return this.fb.control(false)
  //   });
  //   return this.fb.array(arr);

  
  // }
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
  get  status ():FormControl
  {
    return this.bannerForm.get("status") as FormControl 
  }

  // getSelectedValue()
  // {
  //   this.selectedValue=[];
  //   this.brandArray.forEach((control,i)=>{
  //     if(control.value)
  //     {
  //       this.selectedValue.push(this.brands[i]);
  //     }
  //   });
    
  // }

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
  categoryList;
  getCategory(){
  this.api
  .getReqAuth("admin/product/category-list?parent_id="+0)
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
   
    this.api.getReqAuth("admin/category/list?&parent_id="+this.bannerForm.value.category)
    
    .subscribe(
      res => {
        this.subCategoryList=res.result.data;
        console.log(this.subCategoryList)
        return true;
      },
      err => this.error(err),
      () => (this.loader = false)
    );
    
  }

  childList=[];
  getChildList()
  {
    this.api.getReqAuth("admin/category/list?&parent_id="+this.bannerForm.value.sub_category)
    
    .subscribe(
      res => {
        if(res)
        this.childList=res.result.data;
        if(this.childList==null)
        this.childList=res.ressult.message
        this.got=true;
      },
      err => this.error(err),
      () => (this.loader = false)
    );

  }

getFormData()
{

  if(this.bannerForm.value.available_on=='1')
  {
    if(this.bannerForm.value.title!=''&& this.bannerForm.value.date!=''&&
    this.bannerForm.value.display_order!='' && this.bannerForm.value.minimum_value!='' && this.bannerForm.value.discount_type!=''
    &&this.bannerForm.value.minimum_value!=''&& this.selectedValue.length!=0)
      {
        let mydate=this.getCurrentDate()
    
        let start1=mydate['start']
         let end1=mydate['end']
    
    
        this.spinner.show();
        const formData = new FormData();
        formData.append('title', this.bannerForm.value.title);
        formData.append('banner_type','2');
        formData.append('display_order',this.bannerForm.value.display_order)
        formData.append('image', this.url1);
       formData.append('available_on', this.bannerForm.value.available_on);
       formData.append('discount_type', this.bannerForm.value.discount_type);
       formData.append('discount_value', this.bannerForm.value.discount_type);
        formData.append('minimum_value', this.bannerForm.value.minimum_value);
        // formData.append('category', this.bannerForm.value.category);
        // formData.append('sub_category', this.bannerForm.value.sub_category);
        formData.append('brands',JSON.stringify(this.selectedValue) );
        formData.append('products',JSON.stringify(this.selectedProduct))
        formData.append('banner_start_date',start1)
        formData.append('banner_end_date',end1)
      
        formData.append('status',this.bannerForm.value.status)
      
        

      
      //  this.api.postReqAuth("admin/banner/add-banner",formData).subscribe(
      //   res =>{
      //     console.log('success',res)
      //     this.spinner.hide()
      //   },
      //   err => this.error(err),
      //   () => (this.loader = false)


      // );
      return formData
    
      }
      else{
        if(this.selectedValue.length==0)
        this._api.showNotification( 'error', "Please Select Atleast One Brand" );
      this._util.markError(this.bannerForm)
    }
    }
    if(this.bannerForm.valid)
    {
          let mydate=this.getCurrentDate()
    
    let start1=mydate['start']
     let end1=mydate['end']


    this.spinner.show();
    const formData = new FormData();
    formData.append('title', this.bannerForm.value.title);
    formData.append('banner_type','2');
    formData.append('display_order',this.bannerForm.value.display_order)
    formData.append('image', this.url1);
   formData.append('available_on', this.bannerForm.value.available_on);
   formData.append('discount_type', this.bannerForm.value.discount_type);
   formData.append('discount_value', this.bannerForm.value.discount_type);
    formData.append('minimum_value', this.bannerForm.value.minimum_value);
    formData.append('category', this.bannerForm.value.category);
    formData.append('sub_category', this.bannerForm.value.sub_category);
    formData.append('brands',JSON.stringify(this.selectedValue) );
    formData.append('products',JSON.stringify(this.selectedProduct))
    formData.append('banner_start_date',start1)
    formData.append('banner_end_date',end1)
    formData.append('child_category',this.bannerForm.value.child_category)
    
    formData.append('status',this.bannerForm.value.status)
  
    
  
    
 
      return formData

    }
     this._util.markError(this.bannerForm);


}






    onSubmit()
  {
    
    var formData=this.getFormData()
    console.log('length',this.getFormData.length)
    if(formData!=null){
      this.api.postReqAuth("admin/banner/add-banner",formData).subscribe(
        res =>this.success(res),
        err => this.error(err),
        () => (this.loader = false)


      );
    
    }
    

    }

  keyPress(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {    
      
        event.preventDefault();
    }
}


namePress(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);

  if (pattern.test(inputChar)) {    
    
      event.preventDefault();
  }
}


numberPress(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);

  if (this.bannerForm.value.discount_value>=10) {    
    
      event.preventDefault();
  }
}



changeDiscountType(){
console.log('from discount change')
  if(this.bannerForm.value.discount_type=='1')
  this.discountType="Discount Value"
  else
  this.discountType="% Of OFF"
}


choosefile: string = "No file chosen...";
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
errorMessage

viewBanner(){
  this.spinner.show();
  // console.log('vieew')
  this.api
  .getReqAuth("admin/banner/banner-detail?id="+this.id)
  .subscribe(
    res => this.successView(res),
    err => this.error(err),
    () => (this.loader = false)
  );
}


got=false;
brandData=['']
productData=['']
incomingBrands=[]

successView(res){
  this.spinner.hide();

    console.log('detaisl',res)
    this.brandData=res.result.brand_data
    console.log('brand dat',this.brandData)
    

    if(this.brandData==undefined)
    {
    
    this.brandData=['']
    
    }
    else{
      
      for(let v of this.brandData)
      {
    
      this.selectedValue.push(v['id'])
      }
      this.getProductBrand();
      
    }
   
    // this.productList=res.result.product_data
    this.productData=res.result.product_data;
  
 
    if(this.productData==undefined)
    {
    
    this.productData=['']
    
    }
    else{
      
      for(let v of this.productData)
      {
    
      this.selectedProduct.push(v['product_id'])
      }
      this.getProductBrand();
      console.log('selected product',this.selectedProduct)
      
    }
    
  
  
  // console.log('seleceted value id', this.selectedValue)
  var data= res.result;

  this.bannerForm.get('title').patchValue(res.result.title);
  this.bannerForm.get('minimum_value').patchValue(res.result.minimum_value);
  this.bannerForm.get('available_on').patchValue(res.result.available_on);
  this.changeProduct();
  this.bannerForm.get('discount_type').patchValue(res.result.discount_type);
  this.changeDiscountType()

  this.bannerForm.get('discount_value').patchValue(res.result.discount_value);
  if(res.result.available_on=='2')
  {
  this.bannerForm.get('category').patchValue(res.result.category);
  this.bannerForm.get('sub_category').patchValue(res.result.sub_category);
var aaa=this.getSubcategory()
this.getChildList()
// if(this.got)
this.bannerForm.get('child_category').patchValue(res.result.child_category)
this.getProductUsingCategory()
  }
var mydate=res.result.banner_start_date+" "+res.result.banner_end_date
this.bannerForm.get('date').patchValue({ startDate:{_d: res.result.banner_start_date}, endDate:{_d:res.result.banner_end_date }})
this.bannerForm.get('display_order').patchValue(res.result.display_order)

this.url=data['image'];
var str = this.url.split('/');
this.choosefile = str[str.length - 1];
this.bannerForm.get("status").patchValue(res.result.status)
  
}

success(res) {
  setTimeout(() => {     
    this.spinner.hide();
  }, 1000);
  if (res.status == true) {
     this._api.showNotification( 'success', res.message );     
      this.router.navigate(['theme/banners'])
  } else {
    this._util.markError(this.bannerForm);
    this._api.showNotification( 'error', res.message );
  }

}
error(res) {
  setTimeout(() => {     
    this.spinner.hide();
  }, 1000);
  this._api.showNotification( 'error', res.message );
  
}





getFormDataForEdit()
{

  if(this.bannerForm.value.available_on=='1')
  {
    if(this.bannerForm.value.title!=''&& this.bannerForm.value.date!=''&&
    this.bannerForm.value.display_order!='' && this.bannerForm.value.minimum_value!='' && this.bannerForm.value.discount_type!=''
    &&this.bannerForm.value.minimum_value!=''&&this.selectedValue.length!=0)
      {
        let mydate=this.getCurrentDate()
    
        let start1=mydate['start']
         let end1=mydate['end']
    
    
        this.spinner.show();
        const formData = new FormData();
        formData.append('title', this.bannerForm.value.title);
        formData.append('banner_type','2');
        formData.append('display_order',this.bannerForm.value.display_order)
        formData.append('image', this.url1);
       formData.append('available_on', this.bannerForm.value.available_on);
       formData.append('discount_type', this.bannerForm.value.discount_type);
       formData.append('discount_value', this.bannerForm.value.discount_type);
        formData.append('minimum_value', this.bannerForm.value.minimum_value);
        // formData.append('category', this.bannerForm.value.category);
        // formData.append('sub_category', this.bannerForm.value.sub_category);
        formData.append('brands',JSON.stringify(this.selectedValue) );
        formData.append('products',JSON.stringify(this.selectedProduct))
        formData.append('banner_start_date',start1)
        formData.append('banner_end_date',end1)
        formData.append("id",this.id)
        if(this.id!=null)
        formData.append('status',this.bannerForm.value.status)
      
        

      
      //  this.api.postReqAuth("admin/banner/add-banner",formData).subscribe(
      //   res =>{
      //     console.log('success',res)
      //     this.spinner.hide()
      //   },
      //   err => this.error(err),
      //   () => (this.loader = false)


      // );
      return formData
    
      }
      else{
        if(this.selectedValue.length==0)
        this._api.showNotification( 'error', "Please Select Atleast One Brand" );
      this._util.markError(this.bannerForm)
      return 
    }
    }
    if(this.bannerForm.valid)
    {
          let mydate=this.getCurrentDate()
    
    let start1=mydate['start']
     let end1=mydate['end']


    this.spinner.show();
    const formData = new FormData();
    formData.append('title', this.bannerForm.value.title);
    formData.append('banner_type','2');
    formData.append('display_order',this.bannerForm.value.display_order)
    formData.append('image', this.url1);
   formData.append('available_on', this.bannerForm.value.available_on);
   formData.append('discount_type', this.bannerForm.value.discount_type);
   formData.append('discount_value', this.bannerForm.value.discount_type);
    formData.append('minimum_value', this.bannerForm.value.minimum_value);
    formData.append('category', this.bannerForm.value.category);
    formData.append('sub_category', this.bannerForm.value.sub_category);
    formData.append('brands',JSON.stringify(this.selectedValue) );
    formData.append('products',JSON.stringify(this.selectedProduct))
    formData.append('banner_start_date',start1)
    formData.append('banner_end_date',end1)
    formData.append('child_category',this.bannerForm.value.child_category)
    if(this.id!=null)
    formData.append('status',this.bannerForm.value.status)
  formData.append('id', this.id)
    
  
    
 
      return formData

    }
     this._util.markError(this.bannerForm);


}

update()
{
  var formData=this.getFormDataForEdit()
  
  if(formData!=null)
  {
  this.api
  .putReqAuth("admin/banner/edit-banner", formData).subscribe(
    res => {
      this.success(res)
    },
    err => this.error(err),
    () => (this.loader = false)
  );
}else{
  this._util.markError(this.bannerForm);
}


}
}