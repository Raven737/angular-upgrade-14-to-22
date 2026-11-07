import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { StatusLabelPipe } from './status-label.pipe';
import { TaskCardComponent } from '../tasks/task-card/task-card.component';

@NgModule({
  declarations: [StatusLabelPipe, TaskCardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, MaterialModule, StatusLabelPipe, TaskCardComponent]
})
export class SharedModule {}
