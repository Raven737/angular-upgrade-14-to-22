import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Task } from '../../core/task.model';
import { TaskService } from '../../core/task.service';
import { TaskFormDialogComponent } from '../task-form-dialog/task-form-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['title', 'assignee', 'status', 'priority', 'due', 'actions'];
  dataSource = new MatTableDataSource<Task>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => (this.dataSource.data = tasks));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  openDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, { width: '480px', data: task || null });
    dialogRef.afterClosed().subscribe((result: Task | undefined) => {
      if (result) {
        this.taskService.save(result);
        this.snackBar.open(task ? 'Task updated' : 'Task created', 'OK', { duration: 2500 });
      }
    });
  }

  remove(task: Task): void {
    this.taskService.delete(task.id);
    this.snackBar.open('Task deleted', 'OK', { duration: 2500 });
  }
}
