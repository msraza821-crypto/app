import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-loader-button',
  templateUrl: './loader-button.component.html',
  styleUrls: ['./loader-button.component.css']
})
export class LoaderButtonComponent implements OnInit {

  @Input() loader = false;
  @Input() title = 'Submit';
  @Input() disabled = false;
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {

  }

  clicked() {
    this.submit.emit();
  }

}
