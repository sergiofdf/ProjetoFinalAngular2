import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreSectionComponent } from './core-section.component';

describe('CoreSectionComponent', () => {
  let component: CoreSectionComponent;
  let fixture: ComponentFixture<CoreSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
