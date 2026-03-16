import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApps } from './new-apps';

describe('NewApps', () => {
  let component: NewApps;
  let fixture: ComponentFixture<NewApps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewApps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewApps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
