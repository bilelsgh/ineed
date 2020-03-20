import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesExperienceComponent } from './services-experience.component';

describe('ServicesExperienceComponent', () => {
  let component: ServicesExperienceComponent;
  let fixture: ComponentFixture<ServicesExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
