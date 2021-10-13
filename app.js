// App State
// *********

const state = {
    player1: 0,
    player2: 0,
    currentQuestion: {},
    which: true
}

let questions = []

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
    console.log(event)
    if (event.target.innerText === question.correctAnswer){
        console.log("correct")
        $(event.delegateTarget).css("background-color", "green").text("Correct!");

        if (state.which) {
            state.player1 ++
            state.which = !state.which
        } else {
            state.player2 ++
            state.which = !state.which
        }
        // setBoard(questions)
        // update players' scores
        $p1score.text(state.player1) 
        $p2score.text(state.player2)
    } else { 
        $(event.delegateTarget).css("background-color", "red").text("Wrong!")
        console.log("incorrect")
        // setBoard(questions)
        state.which = !state.which
        // update players' scores
        $p1score.text(state.player1) 
        $p2score.text(state.player2)
        
    } 
}

const nextQuestion = () => {
    $("#new").off()
    $("#new").on("click", (event) => {
        console.log("clicked")
        setBoard(questions)
    
    } )
    
}


const setBoard = (q) => {
    // Getting a random question
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex]
    // update the question
    $question.text(randomQuestion.question) 
    $a.text(randomQuestion.answerA).css("background-color", "#aeb110") 
    $b.text(randomQuestion.answerB).css("background-color", "#aeb110")
    $c.text(randomQuestion.answerC).css("background-color", "#aeb110") 
    $d.text(randomQuestion.answerD).css("background-color", "#aeb110") 
    // update players' scores
    // $p1score.text(state.player1) 
    // $p2score.text(state.player2) 

    nextQuestion()

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
// show if question is right or wrong
// next question button
// make it so questions aren't repeated
// reset button
// show winner