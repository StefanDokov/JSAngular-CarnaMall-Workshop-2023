import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

 rents: any = undefined;

  constructor(private auth: AuthService, private api: ApiService) {

  }

  ngOnInit(): void {
    this.api.getRents().subscribe({
      next: (res) => {
        this.rents = res;
      },
      error:(err) => {
        
        
      }
    })
    
  }


  

}
