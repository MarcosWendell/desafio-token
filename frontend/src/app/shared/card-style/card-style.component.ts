import {
  Component,
  OnInit,
  Input
} from '@angular/core';


@Component({
  selector: 'app-card-style',
  templateUrl: './card-style.component.html',
  styleUrls: ['./card-style.component.scss']
})
export class CardStyleComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}
