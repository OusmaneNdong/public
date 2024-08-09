import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemandeurComponent } from './add-demandeur.component';

describe('AddDemandeurComponent', () => {
  let component: AddDemandeurComponent;
  let fixture: ComponentFixture<AddDemandeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDemandeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDemandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
