import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorytemplateComponent } from './categorytemplate.component';

describe('CategorytemplateComponent', () => {
  let component: CategorytemplateComponent;
  let fixture: ComponentFixture<CategorytemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorytemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorytemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
