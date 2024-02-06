import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateScreenComponent } from './activate-screen.component';

describe('ActivateScreenComponent', () => {
  let component: ActivateScreenComponent;
  let fixture: ComponentFixture<ActivateScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivateScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
