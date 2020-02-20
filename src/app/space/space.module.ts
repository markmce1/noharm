import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpacePageRoutingModule } from './space-routing.module';

import { SpacePage } from './space.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpacePageRoutingModule
  ],
  declarations: [SpacePage]
})
export class SpacePageModule {}
