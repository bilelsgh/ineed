import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineSingleComponent } from './cuisine-single.component';

describe('CuisineSingleComponent', () => {
  let component: CuisineSingleComponent;
  let fixture: ComponentFixture<CuisineSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisineSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
