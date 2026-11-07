import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskFormDialogComponent } from './task-form-dialog/task-form-dialog.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [TaskListComponent, TaskFormDialogComponent, TaskDetailComponent],
  imports: [SharedModule, ReactiveFormsModule, TasksRoutingModule],
  entryComponents: [TaskFormDialogComponent]
})
export class TasksModule {}
