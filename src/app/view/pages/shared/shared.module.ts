import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';




@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        
        FormsModule
        
    ],
    exports:[
        ReactiveFormsModule,
        FormsModule
    ], 
    declarations: [
      
    ],
    entryComponents: []
})

export class SharedModule { }