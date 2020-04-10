import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        FormsModule
        
    ],
    exports:[
        ReactiveFormsModule,
        NgbModule,
        FormsModule
    ], 
    declarations: [
      
    ],
    entryComponents: []
})

export class SharedModule { }