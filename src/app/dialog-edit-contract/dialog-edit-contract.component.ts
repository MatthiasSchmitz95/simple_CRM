import { Component, OnInit } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-contract',
  templateUrl: './dialog-edit-contract.component.html',
  styleUrls: ['./dialog-edit-contract.component.scss']
})
export class DialogEditContractComponent implements OnInit {

  user: User;
  loading = false;
  userId;
  newContract = {};
  customerId;
  name;
  income = 0;
  expense = 0;
  selectedContract;
  selectedIncome: number = 0; 
  selectedExpense: number = 0; 
  contracts = []

  constructor(public dialogRef: MatDialogRef<DialogEditContractComponent>, public crud: CrudService, public firestore: Firestore, public authService: AuthService) { }

  ngOnInit(): void {
    this.contracts = this.user.contracts;
    console.log(this.contracts);
    this.customerId = this.crud.customerId;

  }

  updateSelectedContractData() {
    const selectedContractObj = this.contracts.find((contract) => contract.name === this.selectedContract);
    if (selectedContractObj) {
      this.selectedIncome = selectedContractObj.income || 0;
      this.selectedExpense = selectedContractObj.expense || 0;
    }
  }

  editContract() {
    const selectedContractIndex = this.contracts.findIndex(contract => contract.name === this.selectedContract);
    if (selectedContractIndex !== -1) {
      this.contracts[selectedContractIndex].income = this.selectedIncome;
      this.contracts[selectedContractIndex].expense = this.selectedExpense;
      this.crud.updateCustomerContract(this.customerId, this.contracts);
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteContract() {
    const selectedContractIndex = this.contracts.findIndex(contract => contract.name === this.selectedContract);
    if (selectedContractIndex !== -1) {
      this.contracts.splice(selectedContractIndex, 1); 
      this.crud.updateCustomerContract(this.customerId, this.contracts);
      this.closeDialog();
    }
  }

}
