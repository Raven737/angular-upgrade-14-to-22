import { StatusLabelPipe } from './status-label.pipe';

describe('StatusLabelPipe', () => {
  it('turns a status into a readable label', () => {
    const pipe = new StatusLabelPipe();
    expect(pipe.transform('in-progress')).toBe('In progress');
    expect(pipe.transform('done')).toBe('Done');
  });
});
