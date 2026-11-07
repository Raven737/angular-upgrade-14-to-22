import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskStatus } from '../../core/task.model';

@Component({
    selector: 'app-task-card',
    template: `
    <mat-card appearance="outlined" class="task-card">
      <mat-card-title>{{ task.title }}</mat-card-title>
      <mat-card-subtitle>{{ task.assignee || 'Unassigned' }} · due {{ task.due | date: 'mediumDate' }}</mat-card-subtitle>
      <mat-card-content>
        <mat-chip-set aria-label="Task labels">
          <mat-chip [highlighted]="task.priority === 'high'" color="warn">{{ task.priority }}</mat-chip>
          <mat-chip>{{ task.status | statusLabel }}</mat-chip>
        </mat-chip-set>
      </mat-card-content>
      @if (showActions) {
        <mat-card-actions>
          @if (task.status !== 'done') {
            <button mat-button (click)="statusChange.emit('done')">Mark as done</button>
          }
          @if (task.status === 'done') {
            <button mat-button (click)="statusChange.emit('todo')">Reopen</button>
          }
        </mat-card-actions>
      }
    </mat-card>
    `,
    styles: [`.task-card { margin-bottom: 12px; }`],
    standalone: false
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() showActions = true;
  @Output() statusChange = new EventEmitter<TaskStatus>();
}
