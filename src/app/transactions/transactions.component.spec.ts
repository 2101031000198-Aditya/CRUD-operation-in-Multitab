import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionComponent]
    });
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
