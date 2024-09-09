import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddepartComponent } from './adddepart.component';

describe('AdddepartComponent', () => {
  let component: AdddepartComponent;
  let fixture: ComponentFixture<AdddepartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddepartComponent]
    });
    fixture = TestBed.createComponent(AdddepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
