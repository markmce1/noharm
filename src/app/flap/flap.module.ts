import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlapPageRoutingModule } from './flap-routing.module';

import { FlapPage } from './flap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlapPageRoutingModule
  ],
  declarations: [FlapPage]
})
export class FlapPageModule {}
