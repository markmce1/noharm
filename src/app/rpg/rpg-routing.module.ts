import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RPGPage } from './rpg.page';

const routes: Routes = [
  {
    path: '',
    component: RPGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RPGPageRoutingModule {}
