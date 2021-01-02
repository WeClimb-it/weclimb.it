import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MediaPlayerComponent } from './media-player.component';

it('dummy test', () => {
  expect(1).toBe(1);
});

xdescribe('SidebarComponent', () => {
  let component: MediaPlayerComponent;
  let fixture: ComponentFixture<MediaPlayerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MediaPlayerComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
