import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankyouComponent } from './thankyou.component';
import { ThankyouRoutingModule } from './thankyou-routing.module';


@NgModule({
  declarations: [ThankyouComponent],
  imports: [
    CommonModule,
    ThankyouRoutingModule
  ]
})
export class ThankyouModule { }
