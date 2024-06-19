# 4-Player Card Game

## Table of Contents

- [Overview](#overview)
- [Game Features](#game-features)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Development](#development)
- [Contribution](#author)
- [License](#license)

## Overview

**4-Player Card Game** is a multiplayer card game developed using Phaser, where up to four players can engage in strategic card play. The game combines elements of traditional card games with unique mechanics, providing an exciting and competitive experience.

## Game Features

- **Multiplayer**: Supports up to 4 players.
- **Unique Mechanics**: Combines traditional card gameplay with unique rules.
- **Real-time Interaction**: Players interact with the game in real-time.
- **Visually Engaging**: Built with Phaser for dynamic and engaging graphics.
- **Multiple Zones**: Cards are played in different zones like hand, mana pool, play zone, etc.

## Installation

### Prerequisites

- **Ruby**: Ensure Ruby is installed locally
- **PostgreSQL**: Ensure PostgreSQL is installed locally
- **Phaser**: The game uses Phaser, a fast, free, and fun open-source HTML5 game framework.

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Wusinho/cardgame.git

2. **Create DB**:
    ```bash
   rails db:create && rails db:migrate && rails db:seed
   
3. **Create Cards**:
Before anything you need to create the cards


### How to Play

**Objective**:
The goal of the game is to outplay your opponents by strategically using your cards.

**Actions**:
1. A player has a manaPool which will be used to cast spells or creatures
2. There are 5 zones, currently working 3, Hand, ManaPool and PlayZone.
3. A player can also rob monsters or from the manaPool Area
4. If a card an action is performed card owner it returns either to his/her hand or graveyard.
5. The idea is that everyone draws a card from a single pile, 7 cards.
6. Every card can be used in the manaPool. Cast spells and monsters.
7. You hit the opponent on your right, and you get hit by the opponent on your left.
8. You can zoom in if you dont see the card.
9. Currently the system works if th Card has an image_url.

### Development

1. **Clone the repository**:

**Technologies Used**
- Phaser: For game development.
- Ruby on Rails
- ActionCable
- Cloudinary: For managing game assets.

### Author

👤 **Heber Lazo**

- Github: [@Wusinho](https://github.com/Wusinho)
- LinkedIn: [Heber Lazo](https://www.linkedin.com/in/heber-lazo-benza-523266133/)

### License

This project is [MIT](LICENSE) licensed.

## Show your support

Give a star if you :star: like this project!