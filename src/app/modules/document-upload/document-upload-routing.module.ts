import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentUploadComponent } from './document-upload.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: DocumentUploadComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DocumentUploadRoutingModule { }
