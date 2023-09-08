import { Component } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialog-add-contract',
  templateUrl: './dialog-add-contract.component.html',
  styleUrls: ['./dialog-add-contract.component.scss']
})
export class DialogAddContractComponent {

  user: User;
  loading = false;
  userId;
  customerId;
  name;
  income = 0;
  expense = 0;

  constructor(public dialogRef: MatDialogRef<DialogAddContractComponent>,
    public crud: CrudService, public firestore: Firestore, public authService: AuthService,
    private route: ActivatedRoute) { }

  nameControl = new FormControl('', [Validators.required]);
  incomeControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.customerId = this.crud.customerId;
    this.getUserById(this.customerId);

  }

  pushContract() {
    debugger 
     let newContract = {
      'name': this.name,
      'income': this.income,
      'expense': this.expense
    }
    this.crud.pushContract(newContract);
    this.crud.updateCustomerContract(this.customerId, this.crud.existingContracts);
    this.closeDialog();

  }

  getUserById(customerId) {
    const userArr = this.crud.getUserById(customerId);
    userArr.subscribe((user) => {
      this.user = new User(user);
      console.log(this.user.contracts);
      this.checkForContracts();
    })
  }

  checkForContracts() {

  }


  onSubmit() {

  }


  closeDialog() {
    this.dialogRef.close();
  }

}
