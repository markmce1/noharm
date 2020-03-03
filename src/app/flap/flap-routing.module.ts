import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlapPage } from './flap.page';

const routes: Routes = [
  {
    path: '',
    component: FlapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlapPageRoutingModule {}
