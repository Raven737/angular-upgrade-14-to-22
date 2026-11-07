import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Task, TaskStatus } from '../../core/task.model';
import { TaskService } from '../../core/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-detail',
  template: `
    <a mat-button routerLink="/tasks"><mat-icon>arrow_back</mat-icon> Back to tasks</a>
    @if (task(); as task) {
      <app-task-card [task]="task" (statusChange)="changeStatus(task, $event)" />
    } @else if (tasks().length) {
      <p>Task not found.</p>
    }
  `,
  imports: [MatButton, RouterLink, MatIcon, TaskCardComponent]
})
export class TaskDetailComponent {
  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);

  /** Bound from the :id route parameter (withComponentInputBinding) */
  readonly id = input.required<string>();

  protected readonly tasks = toSignal(this.taskService.getAll(), { initialValue: [] });
  readonly task = computed(() => this.tasks().find(t => t.id === Number(this.id())));

  changeStatus(task: Task, status: TaskStatus): void {
    this.taskService.updateStatus(task.id, status);
    this.router.navigate(['/tasks']);
  }
}
