import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVideoDescriptionComponent } from './dialog-video-description.component';

describe('DialogVideoDescriptionComponent', () => {
  let component: DialogVideoDescriptionComponent;
  let fixture: ComponentFixture<DialogVideoDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogVideoDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogVideoDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
