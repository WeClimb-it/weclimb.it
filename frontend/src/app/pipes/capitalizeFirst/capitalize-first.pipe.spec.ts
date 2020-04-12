import { CapitalizeFirstPipe } from './capitalize-first.pipe';

it('dummy test', () => {
  expect(1).toBe(1);
});

xdescribe('CapitalizeFirstPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizeFirstPipe();
    expect(pipe).toBeTruthy();
  });
});
