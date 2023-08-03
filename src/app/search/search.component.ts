import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, map } from 'rxjs';
import { User } from 'src/models/user.class';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  users: User[] = [];
  isSearchEmpty: boolean;
  searchParams = {
    firstName: null,
    email: null,
    city: null,
  }

  constructor(private afsCompact: AngularFirestore,public authService: AuthService) {


  }
  onSearchUser() {
    this.users = [];
    const userDocRef = this.afsCompact.collection('users').doc(`${this.authService.userData.uid}`);
    const $name = userDocRef
      .collection('customer', (ref) =>
        ref.where('firstName', '==', this.searchParams.firstName)
      )
      .valueChanges({ idField: 'id' });

    const $email = userDocRef
    .collection('customer', (ref) =>
        ref.where('email', '==', this.searchParams.email)
      )
      .valueChanges({ idField: 'id' });

    const $city = userDocRef
    .collection('customer', (ref) =>
        ref.where('city', '>=', this.searchParams.city)
      )
      .valueChanges({ idField: 'id' });

    combineLatest([$name, $email, $city])
      .pipe(map(([one, two, three]) => [...one, ...two, ...three]))
      .subscribe((response: any) => {
        this.users = response;
        console.log(this.users);
        
        if (response.length > 0) {
        } else {
          this.isSearchEmpty = true;
        }
      });
  }
}
