# JSAngular-CarnaMall-Workshop-2023
Workshop/Project Build for My JavaScript Angular Course in SoftUni!
### Website for Leasing and Renting Cars

## Description

This is a website for renting cars. 
It is a project for the "Angular - Front- End" course at Software University.
The whole project is using TypeScript.
The back end is written in Node.js and the database is MongoDB.
The front end is written in Angular.

## Local Installation

1. Clone the repository
2. Run `npm install` in both the `Client` and `Server` folders
3. Run `npm run dev` in the `Server` folder for a dev server. Navigate to `http://localhost:5050/`.
   Must fill .env.example (Rename it to .env) file before starting the Server. I am using MongoDB Atlas for the project.
5. Run `ng serve` in a dev server's `Client` folder. Navigate to `http://localhost:4200/`.

\
&nbsp;

## Built With
[![My Skills](https://skillicons.dev/icons?i=js,angular,html,css,nodejs,typescript,vscode)](https://skillicons.dev)

\
&nbsp;

# Angular Sample Code　

```javascript
<header class="header">
    <a routerLink="/home" class="logo">CarNaMall</a>
    <nav class="navbar">
        <a routerLink="/home">Home</a>
        <a routerLink="/cars">Cars</a>
        <a routerLink="/services">Services</a>
        <a routerLink="/about">About</a>
        <a routerLink="/contact">Contact</a>
        <div class="userA" *ngIf="!isLogged">
            <a routerLink="/register">Register</a>
            <a routerLink="/login">Login</a>
        </div>
        <div class="userB" *ngIf="isLogged">
            <a routerLink="/create">Create</a>
            <a routerLink="/profile">Profile</a>
            <a (click)="logOut()">Logout</a>
        </div>
    </nav>
</header>
```

\
&nbsp;

# Screenshots

### Home page 
<img src="Screenshots/homepage.jpg" alt="Home page" width="800">

\
&nbsp;
### Cars list
<img src="Screenshots/carspage.jpg" alt="Cars list" width="800">

\
&nbsp;
### Details page
<img src="Screenshots/detailspage.jpg" alt="Details page" width="800">

\
&nbsp;
### Profile
<img src="Screenshots/profilepage.jpg" alt="Filter by category" width="800">

\
&nbsp;
### Create user
<img src="Screenshots/registerpage.jpg" alt="Create user" width="800">

\
&nbsp;
### Create-Edit Rents
<img src="Screenshots/editpage.jpg" alt="Create-Edit Forms" width="800">

\
&nbsp;
### Delete Form
<img src="Screenshots/deletepage.jpg" alt="Delete confirm" width="800">

\
&nbsp;
