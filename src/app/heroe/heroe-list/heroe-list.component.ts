import { HeroeService } from './../heroe.service';
import { HeroeModel } from './../heroe.model';
import { Component, OnInit, ViewChild } from '@angular/core';

import { PoBreadcrumb, PoModalAction, PoModalComponent, PoPageAction, PoPageFilter, PoPageListComponent, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroe-list',
  templateUrl: './heroe-list.component.html',
  styleUrls: ['./heroe-list.component.css']
})
export class HeroeListComponent implements OnInit {

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
      property: 'email',
      label: 'E-mail',
    },
    {
      property: 'nickname',
      label: 'Apelido',
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

  items: Array<HeroeModel> = [];
  page: number = 0;
  pageSize!: number ;
  showMoreDisabled: boolean = false;
  isLoading: boolean = false;
  hasNext: boolean = false;

  constructor(private heroeService: HeroeService, private router: Router) {}

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

    this.heroeService.getResources(fullParams).subscribe((response) => {
      this.items = fullParams.page === 1 ? response.items : [...this.items, ...response.items];
      this.page = fullParams.page;
      this.hasNext = response.hasNext;
    });
  }



  showMore() {
    this.loadData({ page: ++this.page});
  }

  navigateDetail(item:HeroeModel){

     this.router.navigate(['people/detail', item.id])
  }
  navigateEdit(item:HeroeModel){

     this.router.navigate(['people/edit', item.id])
  }
  navigateNew(item:HeroeModel){

     this.router.navigate(['people/new'])
  }

}
