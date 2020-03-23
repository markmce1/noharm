import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DodgePage } from './dodge.page';

const routes: Routes = [
  {
    path: '',
    component: DodgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DodgePageRoutingModule {}
