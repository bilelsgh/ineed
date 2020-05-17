import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMenageComponent } from './new-menage.component';

describe('NewMenageComponent', () => {
  let component: NewMenageComponent;
  let fixture: ComponentFixture<NewMenageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMenageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMenageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
