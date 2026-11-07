import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Task, TaskStatus } from '../../core/task.model';
import { TaskService } from '../../core/task.service';

@Component({
    selector: 'app-task-detail',
    template: `
    <a mat-button routerLink="/tasks"><mat-icon>arrow_back</mat-icon> Back to tasks</a>
    <ng-container *ngIf="task$ | async as task; else notFound">
      <app-task-card [task]="task" (statusChange)="changeStatus(task, $event)"></app-task-card>
    </ng-container>
    <ng-template #notFound><p>Task not found.</p></ng-template>
  `,
    standalone: false
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
