import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskstepsPage } from './tasksteps';

@NgModule({
  declarations: [
    TaskstepsPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskstepsPage),
  ],
  exports: [
    TaskstepsPage
  ]
})
export class TaskstepsPageModule {}
