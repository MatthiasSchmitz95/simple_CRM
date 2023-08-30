import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditContractComponent } from './dialog-edit-contract.component';

describe('DialogEditContractComponent', () => {
  let component: DialogEditContractComponent;
  let fixture: ComponentFixture<DialogEditContractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditContractComponent]
    });
    fixture = TestBed.createComponent(DialogEditContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
