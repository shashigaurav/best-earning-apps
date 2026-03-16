import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDetails } from './app-details';

describe('AppDetails', () => {
  let component: AppDetails;
  let fixture: ComponentFixture<AppDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
