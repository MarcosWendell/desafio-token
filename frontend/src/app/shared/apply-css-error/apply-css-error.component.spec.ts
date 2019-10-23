import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCssErrorComponent } from './apply-css-error.component';

describe('AplyCssErrorComponent', () => {
  let component: ApplyCssErrorComponent;
  let fixture: ComponentFixture<ApplyCssErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCssErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCssErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
