import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccompageComponent } from './new-accompage.component';

describe('NewAccompageComponent', () => {
  let component: NewAccompageComponent;
  let fixture: ComponentFixture<NewAccompageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccompageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccompageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
