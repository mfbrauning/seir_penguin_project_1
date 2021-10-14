# Project 1 Documentation
## by Fran Brauning

## Introduction

For my Unit 1 project I created a trivia quiz about colors and color theory. It features the initial requirement of a two player game where players can alternate turns and track scores, to which I added the following:

* Game tells you if the answer is right or wrong
    + If the answer is correct, the clicked button turns green and the text changes to "correct"
    + If the answer is wrong, the clicked button turns red and the text changes to "wrong"
    + Page does not immediately go to the next question.
* Next button.
    + allows for the previous function to work, so that the next question only comes up once it is clicked.
* Visible player turns
    + If it is player 1's turn, player 1 text changes to a larger font and different color to indicate player 1's turn, and vice versa.
* Reset button
    + allows for game to be reset
* Questions are not repeated throughout the game
* Game alerts when a player has won
    + game continues until all questions have been asked and answered.
    + once that is done, the winner is announced.


## Technologies Used

- HTML
- CSS
- JS
- jQuery

## Challenges and Process

#### Getting the game to say if the answer is right or wrong and adding a Next button

Initially I wrote code to target the button that was clicked and added CSS styling via jQuery within the function that defined which answer was chosen. It looked like this:

```js
const chooseAnswer = (event, question) => {
    if (event.target.innerText === question.correctAnswer){
        $(event.delegateTarget).css("background-color", "green").text("Correct!");
            if (state.whichPlayer) { 
            state.player1 ++
            state.whichPlayer = !state.whichPlayer
        } else {
            state.player2 ++
            state.whichPlayer = !state.whichPlayer
        }
        setBoard(questions)
    } else { 
        $(event.delegateTarget).css("background-color", "red").text("Wrong!")
        setBoard(questions)
        state.whichPlayer = !state.whichPlayer         
```
**Note:** _I did have problems figuring out how to target the answer buttons when changing the CSS styling, so I did some research. The sources I used to help me along the way of this project are listed at the end of this document._

While the code was correct, the issue I was experiencing was due to the fact that I also included code to give me the following question as soon as the answer was clicked on. So I decided I needed to add a Next button to avoid this. I needed to call the function to set the board with a new question within the Next button. I also chose to write the code so that the players' turns only changed once the Next button was clicked. The code for the Next button looks like this:

```js
const nextQuestion = () => {
    $("#next").off()
    $("#next").on("click", (event) => {
        console.log("clicked")
        state.whichPlayer = !state.whichPlayer
        setBoard(questions)
    
    } )
```

Which meant I also needed to update the **chooseAnswer** function. It ended up looking like this:

```js
const chooseAnswer = (event, question) => {
    if (event.target.innerText === question.correctAnswer){
        $(event.delegateTarget).css("background-color", "green").text("Correct!");
        if (state.whichPlayer) { 
            state.player1 ++
        } else {
            state.player2 ++
        }
    } else { 
        $(event.delegateTarget).css("background-color", "red").text("Wrong!")
    } 
}
```

Once that was done I wanted to update the player's score as soon as the answer was clicked. I added this piece of code to the **chooseAnswer** function:

```js
const chooseAnswer = (event, question) => {
    if (event.target.innerText === question.correctAnswer){
        $(event.delegateTarget).css("background-color", "green").text("Correct!");
        if (state.whichPlayer) { 
            state.player1 ++
        } else {
            state.player2 ++
        }
        // update players' scores
        $p1score.text(state.player1) 
        $p2score.text(state.player2)
    } else { 
        $(event.delegateTarget).css("background-color", "red").text("Wrong!")
        // update players' scores
        $p1score.text(state.player1) 
        $p2score.text(state.player2)    
    } 
}
```

#### Indicating which player's turn it was:

I decided I wanted it to be clear whose turn it was during the game. I included the code for this in the function that set the board once the Next button was clicked. The initial code looked like this:

```js
 if (state.whichPlayer === true) {
        $("#player1 h3").css("color","white"),
        $("#player1 h3").css("font-size", "22px")

    }  else {
        $("#player2 h3").css("color", "white")
        $("#player2 h3").css("font-size", "22px")
    }
```

This piece of code, however, changed each player's text permanently once their first turn came. To fix this I realized I had to change the opposite player's text back to the original on each turn. My code ended up looking like this:

```js
 if (state.whichPlayer === true) {
        $("#player1 h3").css("color","white"),
        $("#player2 h3").css("color", "black"),
        $("#player1 h3").css("font-size", "22px")
        $("#player2 h3").css("font-size", "18px")

    }  else {
        $("#player1 h3").css("color", "black"),
        $("#player2 h3").css("color", "white")
        $("#player2 h3").css("font-size", "22px")
        $("#player1 h3").css("font-size", "18px")
    }
```


## Sources

https://www.w3resource.com/jquery-exercises/jquery-events-exercise-8.php

