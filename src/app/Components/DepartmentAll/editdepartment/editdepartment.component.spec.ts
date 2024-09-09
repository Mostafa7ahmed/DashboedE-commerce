import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdepartmentComponent } from './editdepartment.component';

describe('EditdepartmentComponent', () => {
  let component: EditdepartmentComponent;
  let fixture: ComponentFixture<EditdepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditdepartmentComponent]
    });
    fixture = TestBed.createComponent(EditdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
