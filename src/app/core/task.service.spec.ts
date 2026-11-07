import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { provideHttpClient } from '@angular/common/http';

const TASKS: Task[] = [
  { id: 1, title: 'A', assignee: 'Olena', status: 'todo', priority: 'high', due: '2026-12-01' },
  { id: 2, title: 'B', assignee: 'Petro', status: 'done', priority: 'low', due: '2026-12-02' }
];

describe('TaskService', () => {
  let service: TaskService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(TaskService);
    http = TestBed.inject(HttpTestingController);
  });

  function load(): Task[] {
    let result: Task[] = [];
    service.getAll().subscribe(t => (result = t));
    http.expectOne('assets/tasks.json').flush(TASKS);
    return result;
  }

  it('loads tasks from the API', () => {
    expect(load().length).toBe(2);
  });

  it('adds a new task with the next id', () => {
    load();
    service.save({ id: 0, title: 'C', assignee: '', status: 'todo', priority: 'medium', due: '' });
    let tasks: Task[] = [];
    service.getAll().subscribe(t => (tasks = t));
    expect(tasks.map(t => t.id)).toEqual([1, 2, 3]);
  });

  it('updates status and deletes', () => {
    load();
    service.updateStatus(1, 'done');
    service.delete(2);
    let tasks: Task[] = [];
    service.getAll().subscribe(t => (tasks = t));
    expect(tasks).toEqual([{ ...TASKS[0], status: 'done' }]);
  });
});
