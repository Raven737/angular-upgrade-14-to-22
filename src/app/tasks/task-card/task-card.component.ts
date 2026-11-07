import { Component, input, output } from '@angular/core';
import { Task, TaskStatus } from '../../core/task.model';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { StatusLabelPipe } from '../../shared/status-label.pipe';

@Component({
    selector: 'app-task-card',
    template: `
    <mat-card appearance="outlined" class="task-card">
      <mat-card-header>
        <mat-card-title>{{ task().title }}</mat-card-title>
        <mat-card-subtitle>{{ task().assignee || 'Unassigned' }} · due {{ task().due | date: 'mediumDate' }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <mat-chip-set aria-label="Task labels">
          <mat-chip [highlighted]="task().priority === 'high'" color="warn">{{ task().priority }}</mat-chip>
          <mat-chip>{{ task().status | statusLabel }}</mat-chip>
        </mat-chip-set>
      </mat-card-content>
      @if (showActions()) {
        <mat-card-actions>
          @if (task().status !== 'done') {
            <button mat-button (click)="statusChange.emit('done')">Mark as done</button>
          }
          @if (task().status === 'done') {
            <button mat-button (click)="statusChange.emit('todo')">Reopen</button>
          }
        </mat-card-actions>
      }
    </mat-card>
    `,
    styles: [`.task-card { margin-bottom: 12px; }`],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatChipSet, MatChip, MatCardActions, MatButton, DatePipe, StatusLabelPipe]
})
export class TaskCardComponent {
  readonly task = input.required<Task>();
  readonly showActions = input(true);
  readonly statusChange = output<TaskStatus>();
}
