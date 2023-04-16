# Assignment 3
Group 42 - http://webtech.science.uu.nl/group42/

Luke Koning (7073046)

Rick Tibbe (0794732)

Tomas van Groningen (2435268)


# How to use
1) Clone the repo
2) Run `npm install`
3) Run `npm run db` to seed the database
4) Run `npm run dev` to start the server
5) Access the server at localhost:8042


# Database 

## Structure

`movie_plays` - Contains all different dates & times when a movie plays

`movies` - Contains all movies

`tickets` - Contains all purchased tickets, a.k.a. orders

`users` - Contains all registered users

## Files

`db.sqlite3` contains the regular database

`sessions.sqlite3` contains all persisted express-sessions

For the seeding and creation of the database, run `npm run db`. The SQL definitions for both creating the database and seeding it, can be found inside `/src/database`.


# Users
Password for all users is `secret`, although every user can use a unique password.

Usernames:
- superman
- karen
- tomas
- rick
- luke

Passwords are also hashed with bcrypt for extra security.


# Webtechnology
Interactive Web Application for Utrecht University's Webtechnology course.</br>
Assignment 3 - JavaScript & DOM manipulation

Sources we used: </br>
https://interstellarfilm.fandom.com/wiki/Interstellar_Wiki </br>
https://en.wikipedia.org/wiki/List_of_accolades_received_by_Interstellar </br>
https://www.imdb.com/title/tt0816692/ </br>
https://www.youtube.com/watch?v=zSWdZVtXT7E
