import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('* <=> *', [
        style({ transform: 'translateX({{slideOffset}})' }),
        animate('500ms ease'),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit{

 rents: any = undefined;
 
 currentIndex = 0;
 slideOffset = '0';
 autoplayInterval = 5000;
 bestRent: any = undefined;
 rentsLoop:any = [];

  constructor(private auth: AuthService, private api: ApiService) {

  }

  ngOnInit(): void {
    this.api.getRents().subscribe({
      next: (res) => {
        this.rents = res;
      },
      error:(err) => {
        
        
      }
    });
    
    this.startAutoplay();
    setTimeout(() => {
      this.findBestRent();
      this.rentsWithLoop();
    }, 1000)
    
  }

  findBestRent() {
      this.bestRent = this.rents.sort((a: any, b: any) => a.price - b.price)[0];
  }
   
    rentsWithLoop() {
      // Duplicate the first and last card to create a loop effect
      this.rentsLoop = [this.rents[this.rents.length - 1], ...this.rents, this.rents[0]];
    }
   

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.rents.length;
    this.updateSlideOffset();
  }

  prevSlide() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.rents.length - 1;
    this.updateSlideOffset();
  }

  
  updateSlideOffset() {
    this.slideOffset = `-${this.currentIndex * 106.5}%`;
  }
  startAutoplay() {
    setInterval(() => {
      this.nextSlide();
    }, this.autoplayInterval);
  }

  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }
  
}
