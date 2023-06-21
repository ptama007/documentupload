import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentUploadComponent } from './document-upload.component';
import { DocumentUploadRoutingModule } from './document-upload-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [ 
    DocumentUploadComponent 
  ],
  imports: [
    CommonModule,
    DocumentUploadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxFileDropModule,
    NgxSpinnerModule
  ]
})
export class DocumentUploadModule { }
