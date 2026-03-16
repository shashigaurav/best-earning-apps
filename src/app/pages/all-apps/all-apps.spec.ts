import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllApps } from './all-apps';

describe('AllApps', () => {
  let component: AllApps;
  let fixture: ComponentFixture<AllApps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllApps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllApps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
