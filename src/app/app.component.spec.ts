import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule, SharedModule],
      declarations: [AppComponent]
    }).compileComponents();
  });

  it('renders the toolbar with the Angular version', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).querySelector('.toolbar')?.textContent;
    expect(text).toContain('Team Tasks');
    expect(text).toContain('Angular');
  });
});
