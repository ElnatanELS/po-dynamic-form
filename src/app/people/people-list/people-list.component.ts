
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
import { Router } from '@angular/router';
import { PeopleService } from '../people.service';
import { PeopleModel } from '../people.model';

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
    { label: 'Novo',  action: this.navigateNew.bind(this)},
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
      label: 'Visualizar', action: this.navigateDetail.bind(this),
    },
    { label: 'Editar', action: this.navigateEdit.bind(this) },
    { label: 'Excluir', type: 'danger' },
  ];

  public readonly filterSettings: PoPageFilter = {

    advancedAction: this.advancedFilterActionModal.bind(this),
    placeholder: 'Buscar',
  };

  items: Array<PeopleModel> = [];
  page: number = 0;
  pageSize!: number ;
  showMoreDisabled: boolean = false;
  isLoading: boolean = false;
  hasNext: boolean = false;

  constructor(private peopleService: PeopleService, private router: Router) {}

  ngOnInit() {
    this.pageSize = 10;
    this.loadData();
  }

  advancedFilterActionModal() {
    this.advancedFilterModal.open();
  }

  private loadData(params: { page?: number; search?: string } = {}) {
    const defaultParams: any = { page: 1, pageSize: 10 };
    const fullParams: any = { ...defaultParams, ...params };

    this.peopleService.getResources(fullParams).subscribe((response) => {
      this.items = fullParams.page === 1 ? response.items : [...this.items, ...response.items];
      this.page = fullParams.page;
      this.hasNext = response.hasNext;
    });
  }



  showMore() {
    this.loadData({ page: ++this.page});
  }

  navigateDetail(item:PeopleModel){

     this.router.navigate(['people/detail', item.id])
  }
  navigateEdit(item:PeopleModel){

     this.router.navigate(['people/edit', item.id])
  }
  navigateNew(item:PeopleModel){

     this.router.navigate(['people/new'])
  }
}
