import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RPGPageRoutingModule } from './rpg-routing.module';

import { RPGPage } from './rpg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RPGPageRoutingModule
  ],
  declarations: [RPGPage]
})
export class RPGPageModule {}
