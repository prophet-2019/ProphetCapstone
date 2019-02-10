# PROPHET

Prophet is an educational, sandboxed web trading application designed for people who are new to investing to trade US stocks. The application is geared towards individuals who don't have experience who may not know how to read financial statements. User's can come to our app and see the main statistics they'll need to make decisions and learn by experience without putting any of their own money up.

![Demo Animation](../assets/createfourm.gif?raw=true)

Inside the rooms, live stock market data is used to render and update the bar charts, candle charts, and ticker information in real time. Additionally, the platform provides news information and a sentiment analyzer which lets the students know if that article is neutral, positive or negative about that company. With all this information the students can make a informed buy or sell decision.

![Demo Animation](../assets/screencast.gif?raw=true)

Each users portfolio is updated in real time based on the current holdings.

## Getting Started

To run locally on your machine, simply clone the repository, download postgresQL and create a database named PAPR and NPM install.

![image](../assets/createdb.png?raw=true)

![image](../assets/npminstall.png?raw=true)

or simply visit https://prophet-app.herokuapp.com/

## Built With

Technologies used to build this application include:

* [React](https://reactjs.org/) - Front-end framework used to build components
* [Redux](https://redux.js.org/) - Front-end framework used to manage state
* [IEX API](https://iextrading.com/developer/) - Stock market API with live up to date information on the market
* [React-Vis](https://uber.github.io/react-vis/) - Uber’s D3 Library for charting
* [Sentiment](https://www.npmjs.com/package/sentiment) - NPM library to analyze sentiment of news articles
* [NodeJS](https://nodejs.org/en/) - Server side environment used to set up router
* [ExpressJS](https://expressjs.com/) - Server used to communicate with client side and PostgresQL database
* [Sequelize](http://docs.sequelizejs.com/) - Library used to create models and query database for relevant information
* [PostgresQL](https://www.postgresql.org/) - Relational database used to store all data that is not realtime data
* [Heroku](https://www.heroku.com/) - Deployment service used to host the PAPR application

## Authors

* Jay Bhagat <br/> <img src="../assets/jay.jpg" alt="jay" width="100"/>
* Jonathan Ciccarella <br/> <img src="../assets/jon.png" alt="jonathan" width="100"/>
* Ken Atienza <br/> <img src="../assets/ken.png" alt="ken" width="100"/>

## Acknowledgments

Thank you to all the instructors and fellows at Fullstack Academy for their support
