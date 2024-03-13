import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeListComponent } from './heroe-list/heroe-list.component';

const routes: Routes = [{ path: '', component: HeroeListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroeRoutingModule { }
