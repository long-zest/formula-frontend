## Install and Initialization

** Note that this project is using npm so if you use yarn and get error than change into npm to run this project
+ Clone project in your folder
+ Using `npm install` to install all package the project need (If npm install get version error using add `--legacy-peer-deps` flag after npm install) 

## Run project

+ Use `npm start` to run the project.
+ This project using default port of react (port: 3000) so open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Some info and Feature in project

### Info

+ This project get data from api so depend on how many data api will response and the speed of network will affect with project first loading speed.
+ Year = Season
+ Races = Round 

### Feature

In this project we have 4 pages in total.
+ Results:
  + User can search for all-round happened each year and then choose what round result that user wants to see.
  + They can search directly results of the specific round that happens in a specific year with the round number appearing on all lists or get from the "Rounds" page.
  + After the user chooses the round they want, the list of results will appear with all information, also user can click on a specific user to see all the detail of the user.
+ Drivers:
  + User can search for all drivers that participated in a specific year.
  + Search directly all drivers of the specific round that happen on a specific year with a round number appearing on all list or get from the "Rounds" page.
  + User also can click on a specific user to see all the detail of the user.
+ Rounds:
  + List all round on each year.
  + Users can choose what year they want to list.
  + They can click on a specific round to see the result of that round or use that round number for "Results" or "Drivers".
+ DriverDetail:
  + See all the info on specific drivers, what season did racer participate and how many points they get, and points for each round of the current season.
