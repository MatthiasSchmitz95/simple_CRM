import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, map } from 'rxjs';
import { User } from 'src/models/user.class';
import { AuthService } from '../services/auth.service';
import { SearchServiceService } from '../services/search-service.service';

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

  constructor(private afsCompact: AngularFirestore, public authService: AuthService, public search:SearchServiceService) {
  }
cancleSearch(){
  this.search.search = false;
  this.searchParams.firstName= null;
}

  onSearchUser() {
    this.search.search = true;
    this.customer = [];
    const userDocRef = this.afsCompact.collection('users').doc(`${this.authService.userData.uid}`);
    const $name = userDocRef
      .collection('customer', (ref) =>
        ref.where('firstName'|| 'lastName', '==', this.searchParams.firstName)
      )
      .valueChanges({ idField: 'id' });

    const $email = userDocRef
      .collection('customer', (ref) =>
        ref.where('email', '==', this.searchParams.email)
      )
      .valueChanges({ idField: 'id' });

    const $city = userDocRef
      .collection('customer', (ref) =>
        ref.where('city', '==', this.searchParams.city)
      )
      .valueChanges({ idField: 'id' });

    combineLatest([$name, $email, $city])
      .pipe(map(([one, two, three]) => [...one, ...two, ...three]))
      .subscribe((response: any) => {
        this.customer = response;
        console.log('Gefunden', this.customer);

        if (response.length > 0) {
        } else {
          this.isSearchEmpty = true;
        }
      });
  }
}
