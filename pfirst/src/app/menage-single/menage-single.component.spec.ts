import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageSingleComponent } from './menage-single.component';

describe('MenageSingleComponent', () => {
  let component: MenageSingleComponent;
  let fixture: ComponentFixture<MenageSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenageSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenageSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
