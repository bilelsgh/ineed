import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAreYouSureComponent } from './modal-are-you-sure.component';

describe('ModalAreYouSureComponent', () => {
  let component: ModalAreYouSureComponent;
  let fixture: ComponentFixture<ModalAreYouSureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAreYouSureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAreYouSureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
