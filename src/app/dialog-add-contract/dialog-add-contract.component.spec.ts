import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddContractComponent } from './dialog-add-contract.component';

describe('DialogAddContractComponent', () => {
  let component: DialogAddContractComponent;
  let fixture: ComponentFixture<DialogAddContractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddContractComponent]
    });
    fixture = TestBed.createComponent(DialogAddContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
