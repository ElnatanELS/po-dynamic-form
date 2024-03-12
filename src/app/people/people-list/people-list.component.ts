import { PeopleResponse } from './../../shared/models/people';
import { PeopleService } from './../../core/service/people/people.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  PoBreadcrumb,
  PoModalAction,
  PoModalComponent,
  PoPageAction,
  PoPageFilter,
  PoPageListComponent,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
})
export class PeopleListComponent implements OnInit {
  @ViewChild('advancedFilterModal', { static: true })
  advancedFilterModal!: PoModalComponent;
  @ViewChild('poPageList', { static: true }) poPageList!: PoPageListComponent;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Pessoas' }],
  };

  readonly actions: Array<PoPageAction> = [
    // actions of table here
    { label: 'Novo', disabled: true },
  ];

  readonly columns: Array<PoTableColumn> = [
    { property: 'id' },
    { property: 'name', label: 'Nome' },
    {
      property: 'genre',
      label: 'Genero',
    },
    {
      property: 'email',
      label: 'E-mail',
    },
    {
      property: 'cityName',
      label: 'Cidade',
    },
    {
      property: 'state',
      label: 'Estado',
    },
    {
      property: 'country',
      label: 'País',
    },
  ];

  public readonly advancedFilterPrimaryAction: PoModalAction = {
    action: () => {
      this.poPageList.clearInputSearch();
      this.advancedFilterModal.close();

    },
    label: 'Buscar',
  };

  actionsTable: Array<PoTableAction> = [
    {
      label: 'Visualizar',
    },
    { label: 'Editar' },
    { label: 'Excluir', type: 'danger' },
  ];

  public readonly filterSettings: PoPageFilter = {

    advancedAction: this.advancedFilterActionModal.bind(this),
    placeholder: 'Buscar',
  };

  items: Array<PeopleResponse> = [];
  page!: number ;
  pageSize!: number ;
  showMoreDisabled: boolean = false;
  isLoading: boolean = false;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.getPeoples(this.page, this.pageSize);
  }

  advancedFilterActionModal() {
    this.advancedFilterModal.open();
  }

  getPeoples(page: number, pageSize: number) {
    this.isLoading = true
    this.peopleService.getAllPeople(page, pageSize).subscribe((res) => {
      this.items = [...this.items,...res.items];
      this.isLoading = false;
      this.showMoreDisabled = !res.hasNext;
    });
  }




  showMore(sort: any) {
    this.page += 1;
    this.getPeoples(this.page, this.pageSize)
  }
}
