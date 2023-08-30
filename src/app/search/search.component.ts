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
  searchTerm;

  constructor(private afsCompact: AngularFirestore, public authService: AuthService, public search: SearchServiceService, public dm: DarkmodeService) {
  }
  CancelSearch() {
    this.search.search = false;
    this.searchTerm=null;
  }


  onSearchCustomer() {
    this.search.search = true;
    this.customer = [];
    const userDocRef = this.afsCompact.collection('users').doc(`${this.authService.userData.uid}`);

    userDocRef
      .collection('customer')
      .valueChanges({ idField: 'id' })
      .subscribe((response: any[]) => {
        // Filter documents based on search term across multiple fields
        this.customer = response.filter((doc) =>
          this.checkFieldsContainSearchTerm(doc, this.searchTerm)
        );

        if (this.customer.length > 0) {
          // Perform necessary actions when the search returns results
        } else {
          this.isSearchEmpty = true;
        }
      });
  }

  // Function to check if any of the fields contain the search term
  private checkFieldsContainSearchTerm(doc: any, searchTerm: string): boolean {
    return (
      doc.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.city.toLowerCase().includes(searchTerm.toLowerCase())
      // Add more fields to search as needed
    );
  }

}
