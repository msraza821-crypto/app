import { Component, OnInit, ViewChild, HostBinding } from "@angular/core";
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Router, ActivatedRoute } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
@Component({
  selector: "app-add-brand",
  templateUrl: "./add-brand.component.html",
  styleUrls: ["./add-brand.component.css"]
})
export class AddBrandComponent implements OnInit {

 
  ngOnInit(): void {
    
  }
}
