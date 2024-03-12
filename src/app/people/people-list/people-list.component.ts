import { Component, OnInit, ViewChild } from '@angular/core';

import { PoBreadcrumb, PoModalAction, PoModalComponent, PoPageAction, PoPageFilter, PoPageListComponent, PoTableAction, PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;
  @ViewChild('poPageList', { static: true }) poPageList!: PoPageListComponent;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Pessoas' },
    ]
  };

  readonly actions: Array<PoPageAction> = [
    // actions of table here
    { label: 'Novo', disabled: true }
  ];

  readonly columns: Array<PoTableColumn> = [
    { property: 'id',  },
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
      // const filters = [...this.jobDescription, ...this.status];
      // this.filterAction(filters);
    },
    label: 'Buscar'
  };

  actionsTable: Array<PoTableAction> = [
    {

      label: 'Visualizar',

    },
    {  label: 'Editar' },
    { label: 'Excluir', type: 'danger'  }
  ];

  public readonly filterSettings: PoPageFilter = {
    action: this.filterAction.bind(this),
    advancedAction: this.advancedFilterActionModal.bind(this),
    placeholder: 'Search'
  };

  items: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.items = [
      { name: 'John Doe', age: 33, email: 'johndoe@example.com' }
    ];
   }

   advancedFilterActionModal() {
    this.advancedFilterModal.open();
  }


  filter() {
    // const filters = this.disclaimers.map(disclaimer => disclaimer.value);
    // filters.length ? this.hiringProcessesFilter(filters) : this.resetFilterHiringProcess();
  }

  filterAction(labelFilter: string | Array<string>) {
    const filter = typeof labelFilter === 'string' ? [labelFilter] : [...labelFilter];
    // this.populateDisclaimers(filter);
    this.filter();
  }

}
