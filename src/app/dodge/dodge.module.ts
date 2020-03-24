import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DodgePageRoutingModule } from './dodge-routing.module';

import { DodgePage } from './dodge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DodgePageRoutingModule
  ],
  declarations: [DodgePage]
})
export class DodgePageModule {}
