import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Task } from '../../core/task.model';
import { TaskService } from '../../core/task.service';
import { TaskFormDialogComponent } from '../task-form-dialog/task-form-dialog.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StatusLabelPipe } from '../../shared/status-label.pipe';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatButton, MatIcon, MatFormField, MatLabel, MatInput, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, RouterLink, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow, MatPaginator, DatePipe, StatusLabelPipe]
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
