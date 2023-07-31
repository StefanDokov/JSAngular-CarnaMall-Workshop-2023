import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourofourpageComponent } from './fourofourpage.component';

describe('FourofourpageComponent', () => {
  let component: FourofourpageComponent;
  let fixture: ComponentFixture<FourofourpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FourofourpageComponent]
    });
    fixture = TestBed.createComponent(FourofourpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
