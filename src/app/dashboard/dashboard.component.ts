import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Task, TaskStatus } from '../core/task.model';
import { TaskService } from '../core/task.service';
import { TaskCardComponent } from '../tasks/task-card/task-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [MatCard, TaskCardComponent, MatButton, RouterLink]
})
export class DashboardComponent {
  private readonly taskService = inject(TaskService);
  private readonly tasks = toSignal(this.taskService.getAll(), { initialValue: [] });

  readonly openTasks = computed(() => this.tasks().filter(t => t.status !== 'done').slice(0, 4));
  readonly counts = computed(() => {
    const tasks = this.tasks();
    return {
      todo: tasks.filter(t => t.status === 'todo').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      done: tasks.filter(t => t.status === 'done').length
    };
  });

  onStatusChange(task: Task, status: TaskStatus): void {
    this.taskService.updateStatus(task.id, status);
  }
}
