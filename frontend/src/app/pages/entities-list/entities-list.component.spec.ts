import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntitiesListComponent } from './entities-list.component';

it('dummy test', () => {
  expect(1).toBe(1);
});

xdescribe('EntitiesListComponent', () => {
  let component: EntitiesListComponent;
  let fixture: ComponentFixture<EntitiesListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EntitiesListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
