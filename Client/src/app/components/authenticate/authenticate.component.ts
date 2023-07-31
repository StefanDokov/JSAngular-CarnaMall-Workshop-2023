import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  
  isAuthenticating = true;

  constructor(private auth: AuthService, private api: ApiService, private router: Router) {}

  isLog: boolean = this.auth.isLogged();
  

  ngOnInit(): void {
    
      if (!this.isLog) {

        this.isAuthenticating = false;

      } else {
    
    this.auth.getProfile().subscribe({
      next:() => {
        this.isAuthenticating = false;
      },
      error:() => {
        this.isAuthenticating = false;
       
      },
      complete:() => {
        this.isAuthenticating = false;
      },
    });
  }
  
  }
  
}
