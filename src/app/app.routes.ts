import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.routes').then(m => m.TASK_ROUTES) },
  { path: '**', redirectTo: '' }
];
