import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Task } from '../../core/task.model';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-task-form-dialog',
    templateUrl: './task-form-dialog.component.html',
    imports: [MatDialogTitle, ReactiveFormsModule, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, MatError, MatSelect, MatOption, MatDialogActions, MatButton, MatDialogClose]
})
export class TaskFormDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject<MatDialogRef<TaskFormDialogComponent>>(MatDialogRef);
  data = inject<Task | null>(MAT_DIALOG_DATA);

  form: FormGroup;

  constructor() {
    const data = this.data;

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
