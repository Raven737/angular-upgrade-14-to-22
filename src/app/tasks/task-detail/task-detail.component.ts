import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Task, TaskStatus } from '../../core/task.model';
import { TaskService } from '../../core/task.service';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TaskCardComponent } from '../task-card/task-card.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-task-detail',
    template: `
    <a mat-button routerLink="/tasks"><mat-icon>arrow_back</mat-icon> Back to tasks</a>
    @if (task$ | async; as task) {
      <app-task-card [task]="task" (statusChange)="changeStatus(task, $event)"></app-task-card>
    } @else {
      <p>Task not found.</p>
    }
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatButton, RouterLink, MatIcon, TaskCardComponent, AsyncPipe]
})
export class TaskDetailComponent implements OnInit {
  task$!: Observable<Task | undefined>;

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.task$ = this.route.paramMap.pipe(
      switchMap(params => this.taskService.getById(Number(params.get('id'))))
    );
  }

  changeStatus(task: Task, status: TaskStatus): void {
    this.taskService.updateStatus(task.id, status);
    this.router.navigate(['/tasks']);
  }
}
