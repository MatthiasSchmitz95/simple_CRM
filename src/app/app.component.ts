import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;

  title = 'simple_CRM';

  constructor() {
  }
}
