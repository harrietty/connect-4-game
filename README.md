## Connect Four

Practice your Object Oriented skills to create a Connect 4 Class. The function Connect4 should return a new instance of a connect 4 game. A game should keep track of its state and should have a `play` method to allow a user to play. 

The game is a connection game in which the players first choose a color and then take turns dropping colored discs from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the next available space within the column. A player wins when they are the first to form a horizontal, vertical, or diagonal line of four of their own discs.

The `play` method should take a column number and should drop a counter into the correct column. The method should return a string indicating whether it is the next player's go, or whether there is a winner.