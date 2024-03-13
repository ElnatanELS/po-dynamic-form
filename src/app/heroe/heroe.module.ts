import { PoTemplatesModule } from '@po-ui/ng-templates';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeroeListComponent } from './heroe-list/heroe-list.component';
import { HeroeRoutingModule } from './heroe-routing.module';
import { PoModule } from '@po-ui/ng-components';
import { HeroeDetailComponent } from './heroe-detail/heroe-detail.component';



@NgModule({
  declarations: [
    HeroeListComponent,
    HeroeDetailComponent
  ],
  imports: [
    CommonModule,
    HeroeRoutingModule,
    PoTemplatesModule,
    PoModule,

  ]
})
export class HeroeModule { }
