import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);

  private tasks$ = new BehaviorSubject<Task[]>([]);
  private loaded = false;

  getAll(): Observable<Task[]> {
    if (!this.loaded) {
      this.loaded = true;
      this.http.get<Task[]>('assets/tasks.json').subscribe(tasks => this.tasks$.next(tasks));
    }
    return this.tasks$.asObservable();
  }

  getById(id: number): Observable<Task | undefined> {
    return this.getAll().pipe(map(tasks => tasks.find(t => t.id === id)));
  }

  save(task: Task): void {
    const tasks = this.tasks$.getValue();
    if (task.id) {
      this.tasks$.next(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      const id = Math.max(0, ...tasks.map(t => t.id)) + 1;
      this.tasks$.next([...tasks, { ...task, id }]);
    }
  }

  updateStatus(id: number, status: TaskStatus): void {
    this.tasks$.next(this.tasks$.getValue().map(t => (t.id === id ? { ...t, status } : t)));
  }

  delete(id: number): void {
    this.tasks$.next(this.tasks$.getValue().filter(t => t.id !== id));
  }
}
