import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreProposeComponent } from './filtre-propose.component';

describe('FiltreProposeComponent', () => {
  let component: FiltreProposeComponent;
  let fixture: ComponentFixture<FiltreProposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltreProposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreProposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
