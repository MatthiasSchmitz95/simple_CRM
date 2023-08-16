import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, map } from 'rxjs';
import { User } from 'src/models/user.class';
import { AuthService } from '../services/auth.service';
import { SearchServiceService } from '../services/search-service.service';
import { DarkmodeService } from '../services/darkmode.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  customer: User[] = [];
  isSearchEmpty: boolean;
  searchParams = {
    firstName: null,
    email: null,
    city: null,
  }

  constructor(private afsCompact: AngularFirestore, public authService: AuthService, public search:SearchServiceService, public dm:DarkmodeService) {
  }
CancelSearch(){
  this.search.search = false;
  this.searchParams.firstName= null;
  this.searchParams.city= null;
  this.searchParams.email= null;
}

  onSearchCustomer() {
    this.search.search = true;
    this.customer = [];
    const userDocRef = this.afsCompact.collection('users').doc(`${this.authService.userData.uid}`);
    
    const $name = userDocRef
      .collection('customer', (ref) =>
        ref.where('firstName', '>=', this.searchParams.firstName)
           .where('firstName', '<=', this.searchParams.firstName + '\uf8ff')
      )
      .valueChanges({ idField: 'id' });
  
    const $email = userDocRef
      .collection('customer', (ref) =>
        ref.where('email', '>=', this.searchParams.email)
           .where('email', '<=', this.searchParams.email + '\uf8ff')
      )
      .valueChanges({ idField: 'id' });
  
    const $city = userDocRef
      .collection('customer', (ref) =>
        ref.where('city', '>=', this.searchParams.city)
           .where('city', '<=', this.searchParams.city + '\uf8ff')
      )
      .valueChanges({ idField: 'id' });
  
    combineLatest([$name, $email, $city])
      .pipe(map(([one, two, three]) => [...one, ...two, ...three]))
      .subscribe((response: any) => {
        this.customer = response;
        console.log('Gefunden', this.customer);
  
        if (response.length > 0) {
          // Perform necessary actions when the search returns results
        } else {
          this.isSearchEmpty = true;
        }
      });
  }
}
