import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LieuDetailPage } from './lieu-detail';

@NgModule({
  declarations: [
    LieuDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LieuDetailPage),
  ],
})
export class LieuDetailPageModule {}
