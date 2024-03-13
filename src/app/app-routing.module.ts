import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PeopleDetailComponent } from './people/people-detail/people-detail.component';
import { PeopleEditComponent } from './people/people-edit/people-edit.component';
import { PeopleListComponent } from './people/people-list/people-list.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'people', component:PeopleListComponent},
  {path: 'people/detail/:id', component:PeopleDetailComponent},
  {path: 'people/edit/:id', component:PeopleEditComponent},
  {path: 'people/new', component:PeopleEditComponent},
  { path: 'heroe', loadChildren: () => import('./heroe/heroe.module').then(m => m.HeroeModule) },
  {path: '**', pathMatch:'full', redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
