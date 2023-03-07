# Book-store-packt-assessment-frontend

This is the frontend part of book-store project


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Installing

```
1.Clone to local reposatry from main branch
2.Run "npm install" command - to install depandancies
3.Run "npm run dev" command - to start server
note:Please run on "http://localhost:3000" after running backend server
```
### After configuring the project 
Now you should be seeing below screen 
![image](https://user-images.githubusercontent.com/99594669/223347556-9456287d-2657-4586-83d2-6de3180ad934.png)

### How to access admin pages:
All the admin routes are prefixed by '/admin':
so to open admin panel we have to goto the "http://localhost:3000/admin" route

### Admin login:
![image](https://user-images.githubusercontent.com/99594669/223348665-3487affa-c4fe-4010-ac27-1386e80302ad.png)

### Admin dashboard:
![image](https://user-images.githubusercontent.com/99594669/223348592-b8e69cac-f9b2-4c6a-b2e9-6e8b2ab7ef59.png)

### Flow of the application:
```
From User side:

User can see all the books from the database by applyig various filters and search accordingly
User can see detail page of a book by clicking on it's title 
```

```
From Admin side:

Admin can register and login himself
Admin can see all the books from the database by applyig search accordingly
Admin can edit/delete/show/add book
```
