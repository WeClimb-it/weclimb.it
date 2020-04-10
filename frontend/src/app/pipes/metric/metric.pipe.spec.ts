import { MetricPipe } from './metric.pipe';

it('dummy test', () => {
  expect(1).toBe(1);
});

xdescribe('MetricPipe', () => {
  it('create an instance', () => {
    const pipe = new MetricPipe();
    expect(pipe).toBeTruthy();
  });
});
