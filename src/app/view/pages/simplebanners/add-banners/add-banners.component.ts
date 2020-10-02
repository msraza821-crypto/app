import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormArray,FormBuilder,Validators} from  "@angular/forms";
import { ERROR_MESSAGES, CONFIG, Regex } from 'src/app/constants';
import { CommonUtil } from 'src/app/util';
import { HttpService, AppService } from 'src/app/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-add-banners',
  templateUrl: './add-banners.component.html',
  styleUrls: ['./add-banners.component.scss']
})
export class AddBannersComponent implements OnInit {

  closeResult = '';
  bannerForm:FormGroup;
selectedValue=[];
CONFIG = CONFIG;
isProduct=false;
isBrand=false;
showPage=false;
imageErrorMessage:any=ERROR_MESSAGES;
  brands=[];
  inlineCheckbox='checkbox'
  loader = false;
  discountType=""
  page: number = 1;
  limit=10;
  totalRec=50;
  displayOrderList=[]
  activeOrderList=[];

  isImageError=false;
  isWrongFormat=false;


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
      console.log('image',this.imageErrorMessage.IMAGE_REQUIRED)
 
      this.createForm()
      this.getCategory()
      this.getOrderListing()
      
    
      }
    
      
 
  createForm()
  {
    this.bannerForm=this.fb.group({
      title:['',[Validators.required,Validators.pattern(Regex.spacesDatas),Validators.maxLength(CONFIG.NAME_MAX_LENGTH),Validators.minLength(CONFIG.NAME_MINLENGTH)]],
      // minimum_value:['',[Validators.required,Validators.pattern(Regex.pricePattern)]],
      // available_on:['',[Validators.required]],
      // discount_type:['',[Validators.required]],
      // discount_value:['',[Validators.required,Validators.pattern(Regex.pricePattern)]],
      category:['',[Validators.required]],
      sub_category:['',[Validators.required]],
      child_category:[''],
       status:['',[Validators.required]],
      display_order:['',[Validators.required]]
    
    });
  }

  imageFormats: Array<string> = ['jpeg','png','jpg'];

  FORM_ERROR = {
    title: {
      required: ERROR_MESSAGES.TITLE_REQUIRED,
      maxlength: `${ERROR_MESSAGES.MAX_LENGTH}${this.CONFIG.NAME_MAX_LENGTH}`,
      pattern: ERROR_MESSAGES.INVALID_INPUT,
      minlength: `${ERROR_MESSAGES.MIN_LENGTH}${this.CONFIG.NAME_MINLENGTH}`,
    },
    status: {
      required: ERROR_MESSAGES.STATUS_REQUIRED,
      
     
    },
    category: {
      required: ERROR_MESSAGES.CATEGORY_REQUIRED,
   
    },
    sub_category: {
      required: ERROR_MESSAGES.SUBCATEGORY_REQUIRED
    },
    child_category: {
      // required: ERROR_MESSAGES. CHILD_CATEGORY_REQUIRED
    },
    display_order: {
      required: ERROR_MESSAGES. DISPLAY_ORDER_REQUIRED
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
  get status(): FormControl {
    return this.bannerForm.get("status") as FormControl;
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
    .getReqAuth("admin/banner/category-list?parent_id=0")
    .subscribe(
      res =>{
      
  this.categoryList=res.result
  
      },
      err => this.error(err),
      () => (this.loader = false)
    );
    }
  subCategoryList;

  getOrderListing()
  {
    var list=[1,2,3,4,5,6,7,8,9,10]
    var flag=0;
    this.api.getReqAuth("admin/banner/active-order?banner_type=1")
   .subscribe(
      res => {
        if(res.status)
        {
          this.activeOrderList=res.result
          for( let l of list )
          {

              flag=0;
          
          for(let order of this.activeOrderList)
          {
            if(order==l)
            flag=1;
          }
          if(flag==0)
          this.displayOrderList.push(l)
        }
        console.log('available order',this.displayOrderList)
      }
       
      },
      err => this.error(err),
      () => (this.loader = false)
    );

  }
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

childCategoryList=[];
  getChildcategory(){
    this.bannerForm.get('child_category').patchValue('')
   
    this.api.getReqAuth("admin/banner/category-list?parent_id="+this.bannerForm.value.sub_category)
    
    .subscribe(
      res => {
        this.childCategoryList=res.result
        console.log('child',this.childCategoryList)
      },
      err => this.error(err),
      () => (this.loader = false)
    );
  }
  onSubmit()
  {

    
    if(this.bannerForm.valid&&this.url1!='')
    {

      this.spinner.show();
      const formData = new FormData();
    formData.append('title', this.bannerForm.value.title);
    formData.append('banner_type','1');
   formData.append('display_order',this.bannerForm.value.display_order)
   formData.append('image', this.url1);
  
    formData.append('category', this.bannerForm.value.category);
    formData.append('sub_category', this.bannerForm.value.sub_category);
 formData.append('status',this.bannerForm.value.status );
 if(this.bannerForm.value.child_category!=''&&this.bannerForm.value.child_category!=null)
 formData.append('child_category', this.bannerForm.value.child_category);
    
  
    // console.log('sss',formData)
     this.api.postReqAuth("admin/banner/add-banner",formData).subscribe(
      res => this.success(res),
      err => this.error(err),
      () => (this.loader = false)


    );
    
    }
    else
    {
    if(this.url=='')
    {
      this.isImageError=true;
  
    }
    this._util.markError(this.bannerForm);
    
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

// changeDiscountType(){
// console.log('from discount change')
//   if(this.bannerForm.value.discount_type=='1')
//   this.discountType="Enter discount value..."
//   else
//   this.discountType="% of Off...."
// }


counter(i: number) {
  return new Array(i);
}
choosefile: string = "No file chosen...";
onSelectFile(event) {
  this.keyValue = true;
  this.isImageError=false;
  this.isWrongFormat=false;
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
      this.choosefile= "No file chosen...";
      this.isWrongFormat=true;
      this.url='';
      this.url1='';
    

      return false;
    }

      

    let reader1 = new FileReader();
    reader1.readAsDataURL(event.target.files[0]); // read file as data url
    reader1.onload = (event: any) => { // called once readAsDataURL is completed
     // this.url = event.result;
      this.url = event.target.result;
      
    }


    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
  
    reader.onload = () => {
      
      console.log(this.url,'url') 
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const height = img.naturalHeight;
        const width = img.naturalWidth;
        console.log('Width and Height', width, height);
        if ((height <= CONFIG.BANNER_MIN_HEIGHT || height >= CONFIG.BANNER_MAX_HEIGHT) || (width <= CONFIG.BANNER_MIN_WIDTH || width >= CONFIG.BANNER_MAX_WIDTH)) {
          this.errorMessage = `Please upload the image of required size which is min height ${CONFIG.BANNER_MIN_HEIGHT}, max height ${CONFIG.BANNER_MAX_HEIGHT} and min width ${CONFIG.BANNER_MIN_WIDTH}, max width ${CONFIG.BANNER_MAX_WIDTH}.`;
         // alert()
          this.choosefile="No file chosen...";
      //    alert(this.choosefile)
         this.url='';
            this.url1='';
            this.isImageError=true;
            this.isWrongFormat=true;
            return false;
        }
        else{
         

          this.choosefile=event.target.files[0].name;
  
        }
      }; 
 
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
  this.api
  .getReqAuth("admin/banner/banner-detail?id="+this.id)
  .subscribe(
    res => this.successView(res),
    err => this.error(err),
    () => (this.loader = false)
  );
}
productCate(){
  this.api
  .getReqAuth("admin/banner/category-list?parent_id=0")
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

  productSubCate(id){
 
  this.api.getReqAuth("admin/banner/category-list?parent_id="+id)
  
  .subscribe(
    res => {
      this.subCategoryList=res.result
      console.log(this.subCategoryList)
    },
    err => this.error(err),
    () => (this.loader = false)
  );
}

productChildCate(id){
 
  this.api.getReqAuth("admin/banner/category-list?parent_id="+id)
  
  .subscribe(
    res => {
      this.childCategoryList=res.result
      console.log('child',this.childCategoryList)
    },
    err => this.error(err),
    () => (this.loader = false)
  );
}
successView(res){
  if(res.status==true){
  this.spinner.hide()
  var data= res.result;
  this.productCate();
  this.productSubCate(data['category']);
  this.productChildCate(data['sub_category']);

  Object.keys(this.bannerForm.controls).forEach((control) => {

    this.bannerForm.get(control).patchValue(data[control]);

  });

this.url=data['image'];
var str = this.url.split('/');
this.choosefile = str[str.length - 1];
  }
}


update(){
  if(this.bannerForm.valid&&!this.isWrongFormat)
  {

    this.spinner.show();
    const formData = new FormData();
formData.append('title', this.bannerForm.value.title);
formData.append('id',this.id);
formData.append('banner_type','1');
formData.append('display_order',this.bannerForm.value.display_order)
formData.append('image', this.url1);
formData.append('category', this.bannerForm.value.category);
formData.append('sub_category', this.bannerForm.value.sub_category);
if(this.bannerForm.value.child_category!=''&&this.bannerForm.value.child_category!=null)
formData.append('child_category', this.bannerForm.value.child_category);
formData.append('status',this.bannerForm.value.status );
this.api.putReqAuth("admin/banner/edit-banner",formData).subscribe(
  res => this.success(res),
  err => this.error(err),
  () => (this.loader = false)


);

}
else
{
  if(this.isWrongFormat)
  this.isImageError=true;
this._util.markError(this.bannerForm);

}

}

success(res) {
  setTimeout(() => {     
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
error(res) {
  setTimeout(() => {     
    this.spinner.hide();
  }, 1000);
  this._api.showNotification( 'error', res.message );
  
}
}