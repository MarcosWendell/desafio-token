import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-apply-css-error',
  templateUrl: './apply-css-error.component.html',
  styleUrls: ['./apply-css-error.component.scss']
})
export class ApplyCssErrorComponent implements OnInit {

  @Input()
  message: string;

  @Input()
  show: boolean;

  constructor() { }

  ngOnInit() {
  }

}
