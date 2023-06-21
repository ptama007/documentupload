import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivacyPolicyComponent } from './components/modals/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [ 
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
