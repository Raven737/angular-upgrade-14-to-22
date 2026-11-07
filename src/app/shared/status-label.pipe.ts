import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../core/task.model';

const LABELS: Record<TaskStatus, string> = {
  'todo': 'To do',
  'in-progress': 'In progress',
  'done': 'Done'
};

@Pipe({
  name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {
  transform(value: TaskStatus): string {
    return LABELS[value] || value;
  }
}
