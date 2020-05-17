import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompagnerSingleComponent } from './accompagner-single.component';

describe('AccompagnerSingleComponent', () => {
  let component: AccompagnerSingleComponent;
  let fixture: ComponentFixture<AccompagnerSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccompagnerSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccompagnerSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
