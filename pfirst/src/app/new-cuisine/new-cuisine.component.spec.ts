import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCuisineComponent } from './new-cuisine.component';

describe('NewCuisineComponent', () => {
  let component: NewCuisineComponent;
  let fixture: ComponentFixture<NewCuisineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCuisineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCuisineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
