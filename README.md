# How to use
1) Clone the repo
2) Run `npm install`
3) Run `npm run db` to seed the database
4) Run `npm run dev` to start the server
5) Access the server at localhost:8042

# Routes

GET /movies                     -> Alle movies ophalen, met paginations
                                    Query param -> ?p=1 of ?p=2, etc

GET /movies/:id                 -> Movie ophalen met ID
GET /movies/:id/plays           -> Data wanneer de film speelt
GET /movies/:id/plays/:date     -> Timeslots voor de datum wanneer de film speelt

POST /tickets/:moviePlayId      -> Tickets bestellen
                                    BODY: aantal tickets, cc nummer

GET /user                       -> Haal de user op, wanneer deze ingelogd is
GET /tickets                    -> Haal de tickets van de ingelogde user op

# Webtechnology
Interactive Web Application for Utrecht University's Webtechnology course.</br>
Assignment 3 - JavaScript & DOM manipulation

The amazing developers of this website: </br>
Luke Koning (7073046) </br>
Rick Tibbe (0794732) </br>
Tomas van Groningen (2435268)

Sources we used: </br>
https://interstellarfilm.fandom.com/wiki/Interstellar_Wiki </br>
https://en.wikipedia.org/wiki/List_of_accolades_received_by_Interstellar </br>
https://www.imdb.com/title/tt0816692/ </br>
https://www.youtube.com/watch?v=zSWdZVtXT7E
