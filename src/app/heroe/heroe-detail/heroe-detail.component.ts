import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDynamicViewField } from '@po-ui/ng-components';
import { HeroeModel } from '../heroe.model';
import { HeroeService } from '../heroe.service';

@Component({
  selector: 'app-heroe-detail',
  templateUrl: './heroe-detail.component.html',
  styleUrls: ['./heroe-detail.component.css']
})
export class HeroeDetailComponent implements OnInit {

  heroe!:HeroeModel;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Herói', link: '/heroe' },
      { label: 'Detalhe' }
    ]
  };


  constructor(private heroeService: HeroeService, private route: ActivatedRoute, private router: Router) { }



  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.getHeroe(id)
   }

  getHeroe(id:string){
    this.heroeService.getResource(id).subscribe(
      res => this.heroe =res
    )
  }

  back() {
    this.router.navigate(['people'])
  }

  edit() {
    this.router.navigate(['people/edit', this.heroe.id])
  }



  fields: Array<PoDynamicViewField> = [
    { property: 'id', label: 'Herói ID',   },
    // { property: 'id', label: 'Herói ID',   },
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

}
