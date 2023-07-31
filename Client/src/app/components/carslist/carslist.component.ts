import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

export interface Car {
  _id: string;
  model: string;
  doors: number;
  seats: number;
  transmission: string;
  price: number;
  image: string;
  year: number;
  ownerId: string;
}
@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})


export class CarslistComponent implements OnInit{
  carsLister: Car[] | undefined;
  isLoaded = false;

  constructor(private api: ApiService){}

  ngOnInit(): void {
    setTimeout(()=> {
      this.getRentss();
      this.isLoaded = true;
    }, 1000);
    
    
  }
    
getRentss() { 
    this.api.getRents().subscribe((res) => {
      this.carsLister = res;
    });
  }

}
