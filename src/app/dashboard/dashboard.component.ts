import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task, TaskStatus } from '../core/task.model';
import { TaskService } from '../core/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  counts = { todo: 0, inProgress: 0, done: 0 };
  private subscription?: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.subscription = this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks.filter(t => t.status !== 'done').slice(0, 4);
      this.counts = {
        todo: tasks.filter(t => t.status === 'todo').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        done: tasks.filter(t => t.status === 'done').length
      };
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onStatusChange(task: Task, status: TaskStatus): void {
    this.taskService.updateStatus(task.id, status);
  }

  trackById(index: number, task: Task): number {
    return task.id;
  }
}
