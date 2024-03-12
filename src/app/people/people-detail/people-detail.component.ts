import { PeopleResponse } from './../../shared/models/people';
import { Component, OnInit } from '@angular/core';
import { PoDynamicViewField } from '@po-ui/ng-components';
import { PeopleService } from '../../core/service/people/people.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.css']
})
export class PeopleDetailComponent implements OnInit {

  person!:PeopleResponse;


  constructor(private peopleService: PeopleService, private route: ActivatedRoute, private router: Router) { }



  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.getPerson(id)
   }

  getPerson(id:string){
    this.peopleService.getPerson(id).subscribe(
      res => this.person =res
    )
  }

  back() {
    this.router.navigate(['people'])
  }

  edit() {
    this.router.navigate(['people/detail', this.person.id])
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
