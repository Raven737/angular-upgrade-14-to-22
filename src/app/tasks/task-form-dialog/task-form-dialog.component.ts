import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../core/task.model';

@Component({
    selector: 'app-task-form-dialog',
    templateUrl: './task-form-dialog.component.html',
    standalone: false
})
export class TaskFormDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | null
  ) {
    this.form = this.fb.group({
      title: [data ? data.title : '', [Validators.required, Validators.maxLength(80)]],
      assignee: [data ? data.assignee : ''],
      status: [data ? data.status : 'todo'],
      priority: [data ? data.priority : 'medium'],
      due: [data ? data.due : '']
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close({ ...this.form.value, id: this.data ? this.data.id : 0 });
  }
}
