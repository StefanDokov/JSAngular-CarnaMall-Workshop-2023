import { Component } from '@angular/core';


interface Avatar {
  image: string;
  name: string;
  position: string;
  info: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  avatarsList: Avatar[] = [{
    image: "/assets/images/avatarabout.jpg",
    name: 'James Joes',
    position: 'Leader',
    info: 'some simple information about that dude/dudka'
  },
  {
    image: "/assets/images/avatarabout.jpg",
    name: 'James Joes',
    position: 'Leader',
    info: 'some simple information about that dude/dudka'
  },
  {
    image: "/assets/images/avatarabout.jpg",
    name: 'James Joes',
    position: 'Leader',
    info: 'some simple information about that dude/dudka'
  },
  {
    image: "/assets/images/avatarabout.jpg",
    name: 'James Joes',
    position: 'Leader',
    info: 'some simple information about that dude/dudka'
  },];

  constructor(){}

}
