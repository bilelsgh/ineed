import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesSingleComponent } from './courses-single.component';

describe('CoursesSingleComponent', () => {
  let component: CoursesSingleComponent;
  let fixture: ComponentFixture<CoursesSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
