import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankyouComponent } from './thankyou.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ThankyouComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ThankyouRoutingModule { }
