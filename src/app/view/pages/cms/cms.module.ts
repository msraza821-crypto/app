import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CmsComponent } from './cms/cms.component';
import { AddCmsComponent } from './add-cms/add-cms.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderButtonComponent } from '../shared/loader-button/loader-button.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

const pageRoutes: Routes = [

  {path: '', data:{title:'CMS'},canActivate: [],children:[{ path: '', data:{title:''}, canActivate: [], component: CmsComponent },
  { path: 'add', canActivate: [], component: AddCmsComponent, data:{title:'Edit CMS'} }
]}
];





@NgModule({
  imports: [
    NgxPaginationModule,NgxDaterangepickerMd,RichTextEditorAllModule,
    CommonModule, SharedModule,

    RouterModule.forChild(pageRoutes),
    
  ],
  declarations: [CmsComponent,AddCmsComponent],
  entryComponents: []
})
export class CmsModule { }


