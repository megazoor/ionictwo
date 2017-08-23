import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimecardPage } from './timecard';

@NgModule({
  declarations: [
    TimecardPage,
  ],
  imports: [
    IonicPageModule.forChild(TimecardPage),
  ],
  exports: [
    TimecardPage
  ]
})
export class TimecardPageModule {}
