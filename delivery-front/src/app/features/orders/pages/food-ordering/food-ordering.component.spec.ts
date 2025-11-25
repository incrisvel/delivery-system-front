import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodOrderingComponent } from './food-ordering.component';

describe('FoodOrderingComponent', () => {
  let component: FoodOrderingComponent;
  let fixture: ComponentFixture<FoodOrderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodOrderingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
