import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntitiesListComponent } from './entities-list.component';

const routes: Routes = [
  {
    path: '',
    component: EntitiesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntitiesListRoutingModule {}
