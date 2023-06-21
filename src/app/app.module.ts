import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SimpleModalModule.forRoot({ container: document.body }),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
    })
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
