import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormerServiceComponent } from './former-service.component';

describe('FormerServiceComponent', () => {
  let component: FormerServiceComponent;
  let fixture: ComponentFixture<FormerServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormerServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
