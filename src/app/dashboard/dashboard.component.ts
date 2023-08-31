import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Firestore, collection, doc, getCountFromServer, getDocs, query, where } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { User } from 'src/models/user.class';
import { Observable } from 'rxjs';
import { DarkmodeService } from '../services/darkmode.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userCount;
  user = new User()
  customers$: Observable<any[]>;
  cityList = [];
  income = [];
  expense = [];
  salesVolume: number | null = null;
  expenses: number | null = null;
  profit: number | null = null;
  constructor(public crud: CrudService, public firestore: Firestore, public authService: AuthService, public dm: DarkmodeService) {

  }
  ngOnInit() {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.countCollection(user.uid);
        this.getIncome(user.uid);

      }
    });


  }

  async countCollection(useruid) {
    const coll = collection(this.firestore, `users/${useruid}/customer`);
    const snapshot = await getCountFromServer(coll);
    this.userCount = snapshot.data().count;

  }

  async getIncome(useruid) {
    const customerRef = collection(this.firestore, `users/${useruid}/customer`);
    const querySnapshot = await getDocs(customerRef);
    querySnapshot.forEach((doc) => {
      const contracts = doc.data().contracts;
      if (Array.isArray(contracts) && contracts.length > 0) {
        contracts.forEach((contract) => {
          const expense = contract.expense;
          const income = contract.income;
          this.expense.push(expense);
          this.income.push(income);
        });
      }
    });
    this.expenses = this.sumArray(this.expense);
    this.salesVolume = this.sumArray(this.income);
    this.calculateProfit();
    
    console.log(this.salesVolume);
    console.log(this.profit);
    console.log(this.expenses);
  }

  calculateProfit(){
    this.profit = this.salesVolume - this.expenses;
    if(this.profit < 0){
      document.getElementById('profit').style.color = 'red';
    }
    else{
      document.getElementById('profit').style.color = 'green';
    }

  }

  sumArray(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum;
  }






}
