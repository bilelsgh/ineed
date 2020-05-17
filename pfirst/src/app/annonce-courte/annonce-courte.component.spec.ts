import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceCourteComponent } from './annonce-courte.component';

describe('AnnonceCourteComponent', () => {
  let component: AnnonceCourteComponent;
  let fixture: ComponentFixture<AnnonceCourteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceCourteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceCourteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
