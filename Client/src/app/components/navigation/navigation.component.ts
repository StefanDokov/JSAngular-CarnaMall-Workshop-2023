import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
   

  constructor(private auth: AuthService) {}

ngOnInit(): void {
  
}

get isLogged(): boolean {
  return this.auth.isLoggedIn;
}
 

  logOut() {
    this.auth.logOut();
  }
}
