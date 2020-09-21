# Fantasy Data Capstone

FantasyData allows users to access a large database of fantasy football statistics on players on their team or for research on hopeful draft picks! The data is historical and current, and gives a macro level view of a player's performance in seasons past along with some statistics forecasting future performance. Use this to get a leg up on your league mates!

## Working Prototype
You can access a working prototype of the react app here: https://fantasy-data-react-capstone.vercel.app/

## User Stories

* As a new user, I want create an account and login. HIGH IMPORTANCE
* As a new user, I want to be able to search for fantasy data on specific players. HIGH IMPORTANCE
* As a new user, I want to be able to access visual representations of the data. HIGH IMPORTANCE
* As a new user, I want to be able to compare and contrast player data. MEDIUM IMPORTANCE
* As a new user, I want to be able to add players to a watch list. HIGH IMPORTANCE
* As a returning user, I want to be able to access my watch lists and edit them. HIGH IMPORTANCE
* As a returning user, I want to have my previous search history easily accesible. LOW IMPORTANCE
* As a returning user, I want to see data I have not seen before. MEDIUM IMPORTANCE
* As an administrator, I want to have access to settings from individual acccounts. LOW IMPORTANCE
* As an administrator, I want to be able to refresh the player data. HIGH IMPORTANCE*

#### Landing Page
* as a visitor
* I want to understand what I can do with this app (or sign up, or log in) so I can decide if I want to use it

#### Sign Up
* as a visitor
* I want to register to use this app so I can create a list of players to keep tabs on

### Wireframe
Register Wireframe
https://repl.it/join/sgmtmvhv-christiangeorge 
User enters username and confirms password -> if criteria is not met an alert is generated -> once criteria is met user is directed to login

Login Wireframe
https://repl.it/join/igyjbgia-christiangeorge
User enters username and confirms password -> if criteria is not met an alert is generated -> once criteria is met user is directed to homepage

Homepage Wireframe
https://repl.it/join/fuppmiii-christiangeorge
User is able to navigate by nav bar at the top -> user can search for players using different search methods -> search methods will take user to player wireframes, listing different players that match search criteria

Player Wireframe
https://repl.it/join/oqosezmo-christiangeorge
User is still ablet to navigate with nav bar at top and user is also able to see a breakdown of player stats, past and projected -> stats are clickable for further details -> user can click and add the player to a watchlist specific to that user

Watchlist Wireframe
https://repl.it/join/vbuayxuu-christiangeorge
User is able to navigate from top nav bar and see their list of players that have been added to watchlist -> user can manage their watchlist my moving players up and down as wellas removing them

## Screenshots
Landing/Login Page |
:-------------------------:|
![Login Page](/public/github-images/login-screenshot.png)  | 
Register Page |
:-------------------------:|
![Register Page](/public/github-images/register-screenshot.png)  | 
Home Page |
:-------------------------:|
![Home Page](/public/github-images/home-screenshot.png)  | 
Watchlist Page |
:-------------------------:|
![Watchlist Page](/public/github-images/watchlist-screenshot.png)  | 


## Functionality
The app's functionality includes:

* Every User has the ability to create an account that stores information unique to them
* User can research players and see statistics on historical performance and fantasy statistics such as ADP
* User can add players to Watchlist

## Business Objects (database structure)
* User (collection)
    * ID
    * Email
    * Password
    * First name
    * Last name
* Player
    * Team
    * Player Name
    * Position
    * ADP
    * ADP PPR
    * Bye Week
    * Last Season Fantasy Points
    * Projected Fantasy Points
* Watchlist
    * User ID
    * Player Name
    * Player Team
    * Player Position



## Technology
* Front-End: HTML5, CSS3, JavaScript ES6, jQuery
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, MongoDB, Mongoose
* Development Environment: Heroku, mLab, Robo 3T

## Responsive
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* Wishlist (from the inventory page part details);
        (1) see how many parts there are in the Wishlist

## How to run it
Use command line to navigate into the project folder and run the following in terminal

### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test

### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test
