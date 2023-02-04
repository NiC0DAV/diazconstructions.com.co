import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarViewerComponent } from './star-viewer.component';

describe('StarViewerComponent', () => {
  let component: StarViewerComponent;
  let fixture: ComponentFixture<StarViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
