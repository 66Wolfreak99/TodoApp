import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';

  constructor(){
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA3-x8VbV7DlM4AYdR9t5kV5n3LSZR0ah4",
    authDomain: "todo-986eb.firebaseapp.com",
    projectId: "todo-986eb",
    storageBucket: "todo-986eb.appspot.com",
    messagingSenderId: "1062014153572",
    appId: "1:1062014153572:web:ff278dbed176c239364071"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }
}
