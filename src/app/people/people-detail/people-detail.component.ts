import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDynamicViewField } from '@po-ui/ng-components';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleModel } from '../people.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.css']
})
export class PeopleDetailComponent implements OnInit {

  person!:PeopleModel;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Pessoas', link: '/people' },
      { label: 'Detalhe' }
    ]
  };


  constructor(private peopleService: PeopleService, private route: ActivatedRoute, private router: Router) { }



  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.getPerson(id)
   }

  getPerson(id:string){
    this.peopleService.getResource(id).subscribe(
      res => this.person =res
    )
  }

  back() {
    this.router.navigate(['people'])
  }

  edit() {
    this.router.navigate(['people/edit', this.person.id])
  }



  fields: Array<PoDynamicViewField> = [
    { property: 'id', label: 'User ID', key: true },
    { property: 'name', label: 'Nome',  },
    {
      property: 'genre',
      label: 'Genero',
      options: [{ label: 'Masculino', value: 'male' },
      { label: 'Feminino', value: 'female' },
      { label: 'Outros', value: 'other' }],
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

}
