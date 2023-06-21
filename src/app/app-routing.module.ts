import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'document-upload/:firstName/:lastName/:paymentCode', loadChildren: () => import('./modules/document-upload/document-upload.module').then(m => m.DocumentUploadModule) },
  { path: 'document-upload/:firstName/:lastName/:paymentCode/:expiredOn', loadChildren: () => import('./modules/document-upload/document-upload.module').then(m => m.DocumentUploadModule) },
  { path: 'document-upload', loadChildren: () => import('./modules/document-upload/document-upload.module').then(m => m.DocumentUploadModule) },
  { path: 'thankyou/:code', loadChildren: () => import('./modules/thankyou/thankyou.module').then(m => m.ThankyouModule) },
  { path: '404', component: NotfoundComponent },
  { path: 'expired', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
