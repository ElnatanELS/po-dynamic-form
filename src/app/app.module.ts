import { PeopleService } from './core/service/people/people.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HomeComponent } from './home/home.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { PeopleEditComponent } from './people/people-edit/people-edit.component';
import { PeopleDetailComponent } from './people/people-detail/people-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PeopleListComponent,
    PeopleEditComponent,
    PeopleDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    PoTemplatesModule
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
