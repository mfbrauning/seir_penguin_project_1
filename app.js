// App State
// *********

const state = {
    player1: 0,
    player2: 0,
    currentQuestion: {},
    whichPlayer: true,
}

let questions = []

let usedQ = []

// *****************
// Main DOM Elements
// *****************

const $question = $("#question")
const $a = $("#a")
const $b = $("#b")
const $c = $("#c")
const $d = $("#d")
const $p1score = $("#player1 h4")
const $p2score = $("#player2 h4")




// ******************
// Functions
// ****************** 




const chooseAnswer = (event, question) => {
    if (event.target.innerText === question.correctAnswer){
        $(event.delegateTarget).css("background-color", "#C2E03A").text("Correct!");
        if (state.whichPlayer) { 
            state.player1 ++
            // state.whichPlayer = !state.whichPlayer
        } else {
            state.player2 ++
            // state.whichPlayer = !state.whichPlayer
        }
        // setBoard(questions)
        // update players' scores
        $p1score.text(state.player1) 
        $p2score.text(state.player2)
    } else { 
        $(event.delegateTarget).css("background-color", "#E03320").text("Wrong!")
        console.log("incorrect")
        // setBoard(questions)
        // state.whichPlayer = !state.whichPlayer
        // update players' scores
        $p1score.text(state.player1) 
        $p2score.text(state.player2)    
    } 
    winningConditions()
}

const nextQuestion = () => {
    $("#next").off()
    $("#next").on("click", (event) => {
        console.log("clicked")
        state.whichPlayer = !state.whichPlayer
        setBoard(questions)
    
    } )
    
}


const reset = () => {
    $("#reset").off()
    $("#reset").on("click", (event) => {
        state.whichPlayer = true
        state.player1 = 0
        state.player2 = 0
        $("#player1 h3").css("color","white"),
        $("#player2 h3").css("color", "black"),
        $("#player1 h3").css("font-size", "22px")
        $("#player2 h3").css("font-size", "18px")
        $question.css({"background-color":"white", "text-align": "left"})
        $p1score.text(state.player1) 
        $p2score.text(state.player2)
        if (winningConditions()) {
            $(".wins").remove()
            $("ul").append($a)
            $("ul").append($b)
            $("ul").append($c)
            $("ul").append($d)
            $("#answer").append($("ul"))
            console.log($a)
        }
        setBoard(questions)


    })
}

reset()


const winningConditions = () => {
    if (state.player1 >= 10){
        $question.text("Game Over!").css({"background-color":"#ff8e25", "text-align": "center"})
        $a.remove()
        $b.remove()
        $c.remove()
        $d.remove()
        $("ul").remove()
        $playerWins = $("<div>").addClass("wins").text("Player 1 Wins!")
        $("#answer").append($playerWins)
    } else if (state.player2 >= 10){
        $question.text("Game Over!").css({"background-color":"#ff8e25", "text-align": "center"})
        $a.remove()
        $b.remove()
        $c.remove()
        $d.remove()
        $("ul").remove()
        $playerWins = $("<div>").addClass("wins").text("Player 2 Wins!")
        $("#answer").append($playerWins)
    }
    reset()

}

const setBoard = (q) => {
    // Getting a random question
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex]
    // usedQ 
    // update the question
    // if (usedQ === randomQuestion.question) {
    //     setBoard()
    // } else 
    // usedQ = randomQuestion.question

    // console.log(usedQ)
    
    $question.text(randomQuestion.question) 
    $a.text(randomQuestion.answerA).css("background-color", "#aeb110") 
    $b.text(randomQuestion.answerB).css("background-color", "#aeb110")
    $c.text(randomQuestion.answerC).css("background-color", "#aeb110") 
    $d.text(randomQuestion.answerD).css("background-color", "#aeb110") 
    
    

    nextQuestion()

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

    $("li").off()

    $("li").on("click", (event) => {
        chooseAnswer(event, randomQuestion); 
    }); 
    
}




 

    




    
    















// ***********************
// Main App Logic
// ***********************







const URL= "https://cdn.contentful.com/spaces/kaxsjzwpr82l/environments/master/entries?access_token=MDJLO3wCj8qU5M8aJ4NJLeU5M66-DkiARmFX75YBX5E&content_type=triviaQuestions"
        $.ajax(URL)
        .then((data) => {
            questions =  data.items.map((q) => q.fields)
            console.log(data)
            console.log(questions)

            setBoard(questions)
        })




// ************************
// Want to Add
// ************************

// show whose turn it is
// show if question is right or wrong [x]
// next question button [x]
// make it so questions aren't repeated
// reset button
// show winner