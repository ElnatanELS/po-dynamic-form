import { PeopleResponse } from './../../shared/models/people';
import { Component, OnInit } from '@angular/core';
import {
  PoBreadcrumb,
  PoBreadcrumbItem,
  PoDynamicFormField,
  PoNotificationService,
} from '@po-ui/ng-components';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from '../../core/service/people/people.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.css'],
})
export class PeopleEditComponent implements OnInit {
  person!: PeopleResponse;
  dynamicForm!: NgForm;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Pessoas', link: '/people' },
    ],
  };

  fields: Array<PoDynamicFormField> = [
    { property: 'id', label: 'User ID', key: true, disabled: true },
    { property: 'name', label: 'Nome' },
    {
      property: 'genre',
      label: 'Genero',
      options: [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
        { label: 'Outros', value: 'other' },
      ],
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

  breadcrumbItem: PoBreadcrumbItem = { label: '' };

  title!: string;

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router,
    public poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    if (id) {
      this.getPerson(id);

      this.title = 'Editar Pessoa';
    } else {
      this.title = 'Incluir Pessoa';
      this.fields[0].visible = false;
    }
    this.setBreadcrumb();
  }

  getPerson(id: string) {
    this.peopleService.getPerson(id).subscribe((res) => (this.person = res));
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  private setBreadcrumb() {
    this.breadcrumbItem = { label: this.title.split(' ')[0] };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }

  cancel() {
    this.router.navigate(['people']);
  }

  save() {
    this.person
      ? this.editPerson()
      : this.createPerson();
  }

  saveNew() {
    this.save()
    this.router.navigate(['people/new']);
  }

  editPerson(){
    this.peopleService.editPerson(this.dynamicForm.value).subscribe(() => {
      this.poNotification.success('Pessoa Editada com sucesso!');
      this.cancel()
    })
  }
  createPerson(){
    this.peopleService.createPerson(this.dynamicForm.value).subscribe(() => {
      this.poNotification.success('Pessoa incluida com sucesso!');
      this.cancel()
    })
  }
}
