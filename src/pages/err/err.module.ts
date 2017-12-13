import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ErrPage } from './err';

@NgModule({
  declarations: [
    ErrPage,
  ],
  imports: [
    IonicPageModule.forChild(ErrPage),
  ],
})
export class ErrPageModule {}
