/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetBearerComponent } from './get-bearer.component';

describe('GetBearerComponent', () => {
  let component: GetBearerComponent;
  let fixture: ComponentFixture<GetBearerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBearerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBearerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
