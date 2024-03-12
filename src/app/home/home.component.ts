import { Component, OnInit } from '@angular/core';

import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly pageActions: Array<PoPageAction> = [];

  constructor() { }

  ngOnInit() { }

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home'}
    ]
  };

}
