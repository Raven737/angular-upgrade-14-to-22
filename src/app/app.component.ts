import { Component, ChangeDetectionStrategy } from '@angular/core';
import { VERSION } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {
  title = 'Team Tasks';
  angularVersion = VERSION.full;
}
