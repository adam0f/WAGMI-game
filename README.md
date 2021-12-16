## Cooking Wagie

### Intro

Cooking Wagie is an upcoming cooking [Aavegotchi](https://aavegotchi.com) minigame where Aavegotchis will pick up ingredients from the Great Conveyor Belt and process them at various cooking stations to make the ROFLs their orders on time or else risk the threat of our WAGMI Store receiving any 1 star Yelp reviews.

### Game Mechanics

#### Orders System

ROFLs will appear at the restraunt with their order and a timer for their order to be prepared. If the timer elaspes it will trigger the game to end. For every order correctly filled you will get a point. As your score grows, the ROFLs will enter the store more frequently, with faster times and expect more complex meals to be created. Score will be updated on the leaderboard if you beat your previous best when your game ends.

#### Carry and Drop System

Ingredients will spawn from the edge of the conveyor belt. Ingredients can be carried one at a time. Ingredients can be placed at a cooking station or  dropped on the floor. Above the Aavegotchi will show the ingredients carried by an Aavegotchi. Meals can be collected by Aavegotchis from cooking stations, dropped on the floor or dropped at a ROFL to fulfill an order.

#### Cooking Stations

The game will feature multiple cooking stations. The player with need to stand in proximity to the station with an eligible ingredient and press a button on screen to use the station.

Chopping Station: for cutting vegetables and meat.

Deep Frier: cooking meat and fries

Assembly Station: for assembling ingreidents into meals for example creating a burger.

Drinks Station: filling up disposable cups with softdrink, milkshakes

Carry and drop system - ingredient, meals, display an inventory of held items, can drop on the floor, on a station or at a rofl

### Technology

Aavegotchi/Moralis template

Websockets solution for server side validation

Database for leaderboards

### Game Assets

Ingredients Graphics TBC

Cooking Stations Graphics TBC

User Interface Graphics TBC

Sound Effects TBC

### Project Plan

Aim to get a playable game by mid December 2021.

## NextJS Moralis Aavegotchi

This is a starter template for Aavegotchi built with [Next.js](https://nextjs.org/learn) and [Moralis](https://docs.moralis.io/) buult to streamline the development of you Aavegotchi DApp.

It is written primarily in Typescript and uses [styled components](https://styled-components.com/) for styling.

## Dev dependencies needed

* [ts-node](https://github.com/TypeStrong/ts-node)
* [Node >= 10.16 and npm >= 5.6](https://nodejs.org/en/)

## Getting started

Using the [github client](https://cli.github.com/), in your command line run:
```
gh repo create <my-web3-project> --template="https://github.com/ccoyotedev/aavegotchi-moralis-phaser.git"
cd <my-web3-project>
git pull origin main
yarn install
```

To run the app, in your terminal run:
```
yarn dev
```

To connect to Moralis you will need to create a new Moralis project by following the [Moralis documentation]("https://docs.moralis.io/getting-started/quick-start").

Then create a `.env.development` and `.env.production`. Inside both set the the following keys:

```
MORALIS_APPLICATION_ID='[APP_ID]'
MORALIS_SERVER_ID='[SERVER_ID]'
```
