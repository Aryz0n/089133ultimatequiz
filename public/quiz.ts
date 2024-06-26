let qnum = 0;
let score = 0;
let question = "";
let img1 = new Image;
img1.src = "media/demon2.webp";
img1.height = 200;
img1.id = "quizimage";
let answers = [];
let jsondata;


//Load all quiz data from /single-quiz API page
async function getJSON() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('filename');
    const response = await fetch(`/singlequiz-data?filename=${query}`);

    jsondata = await response.json();
    questionUpdate(qnum);
    document.getElementById("welcome").innerHTML = jsondata.quizname; //Set the title to the quiz name
}

function ans(a){

    if(a == '4'){
        let openanswer = ((<HTMLInputElement>document.getElementById('openquestion')).value.toUpperCase());
        answers.push(openanswer);
        qnum ++;
        questionUpdate(qnum);
    }else{
        answers.push(a);
        qnum ++;
        questionUpdate(qnum);
    }

}


let count = 20;
let timer;

function startTimer() {
        timer = setInterval(function() {
        count--;
        document.getElementById("timer").innerHTML = count.toString();
        if (count === 0) {
            clearInterval(timer);
            answers.push("timeout");
            qnum ++;
            questionUpdate(qnum);
        }
        }, 1000);
    }

let cancel = () => {
    clearInterval(timer);
    count = 20;
}



function questionUpdate(questionNumber) {
    cancel();
    if (qnum == jsondata.questions.length) {
        cancel();
        (<HTMLButtonElement>document.getElementById("ansbtn1")).setAttribute("style", "display: none;");
        (<HTMLButtonElement>document.getElementById("ansbtn2")).setAttribute("style", "display: none;");
        (<HTMLButtonElement>document.getElementById("ansbtn3")).setAttribute("style", "display: none;");
        (<HTMLButtonElement>document.getElementById("ansbtn4")).setAttribute("style", "display: none;");
    
        (<HTMLButtonElement>document.getElementById("resbtn1")).setAttribute("style", "display: block;");
    
        document.getElementById("questionnum").innerHTML = "Einde!";
        document.getElementById("question").innerHTML = "Click op de knop onderaan om je resultaten te zien.";

    } else if (!jsondata.questions[questionNumber].question || !jsondata.questions[questionNumber].answers){
        alert("Error: question data not found!");
        answers.push("ERROR");
        qnum ++;
        questionUpdate(qnum);
    }
    else {
    startTimer();

    document.getElementById("question2").setAttribute("style", "opdacity: 0;");

    if(jsondata.questions[questionNumber].image != "no_image"){
        img1.src = jsondata.questions[questionNumber].image;
        document.getElementById("question2").setAttribute("style", "opacity: 1;");
    }

    document.getElementById("questionnum").innerHTML = "Vraag " + (qnum + 1) + "";


    if (jsondata.questions[questionNumber].answers.length == 1){
        document.getElementById("question").innerHTML = jsondata.questions[questionNumber].question;
        (<HTMLButtonElement>document.getElementById("ansbtn1")).setAttribute("style", "display: none;");
        (<HTMLButtonElement>document.getElementById("ansbtn2")).setAttribute("style", "display: none;");
        (<HTMLButtonElement>document.getElementById("ansbtn3")).setAttribute("style", "display: none;");
        (<HTMLButtonElement>document.getElementById("ansbtn4")).setAttribute("style", "display: none;");

        (<HTMLButtonElement>document.getElementById("ansbtn5")).setAttribute("style", "display: block;");
        document.getElementById("openquestion").setAttribute("style", "display: block;");
    } else {
            document.getElementById("question").innerHTML = jsondata.questions[questionNumber].question;
            (<HTMLButtonElement>document.getElementById("ansbtn1")).setAttribute("style", "display: block;");
            (<HTMLButtonElement>document.getElementById("ansbtn2")).setAttribute("style", "display: block;");
            (<HTMLButtonElement>document.getElementById("ansbtn3")).setAttribute("style", "display: block;");
            (<HTMLButtonElement>document.getElementById("ansbtn4")).setAttribute("style", "display: block;");
            (<HTMLButtonElement>document.getElementById("ansbtn1")).innerHTML = jsondata.questions[questionNumber].answers['0'];
            (<HTMLButtonElement>document.getElementById("ansbtn2")).innerHTML = jsondata.questions[questionNumber].answers['1'];
            (<HTMLButtonElement>document.getElementById("ansbtn3")).innerHTML = jsondata.questions[questionNumber].answers['2'];
            (<HTMLButtonElement>document.getElementById("ansbtn4")).innerHTML = jsondata.questions[questionNumber].answers['3'];

            (<HTMLButtonElement>document.getElementById("ansbtn5")).setAttribute("style", "display: none;");
            document.getElementById("openquestion").setAttribute("style", "display: none;");
        }
    }
}


function start(){
    document.getElementById("div3").setAttribute("style", "display: none;");
    document.getElementById("div4").setAttribute("style", "display: none;");
    document.getElementById("question2").appendChild(img1);

    let elements3 = document.getElementsByClassName('logo');
    for(let i=0; i<elements3.length; i++) { 
    elements3[i].setAttribute("style","display: none;");
    }

    let elements1 = document.getElementsByClassName('div1');
    for(let i=0; i<elements1.length; i++) { 
    elements1[i].setAttribute("style", "display: block;");
    }

    let elements2 = document.getElementsByClassName('div2');
    for(let i=0; i<elements2.length; i++) { 
    elements2[i].setAttribute("style", "display: block;");
    }
}

//Print out the results
function res(){
    let elements1 = document.getElementsByClassName('div1');
    for(let i=0; i<elements1.length; i++) { 
    elements1[i].setAttribute("style", "display: none");
    }

    let elements2 = document.getElementsByClassName('div2');
    for(let i=0; i<elements2.length; i++) { 
    elements2[i].setAttribute("style", "display: none");
    }
    let score = 0;
    for (let i = 0; i < jsondata.questions.length; i++) {
        let answernum = i + 1;
        let result = document.createElement("h2");
        result.setAttribute("id", "ans"+ i.toString());
        result.setAttribute("class", "ans");
        if(answers[i] == jsondata.questions[i].correct){
            score ++;
            result.setAttribute("style", "color: green");
        }
        if(jsondata.questions[i].answers.length == 1){
            result.innerText = answernum.toString() + ": " + answers[i];
        } else {
        result.innerText = answernum.toString() + ": " + jsondata.questions[i].answers[parseInt(answers[i])]; //array and answers are strings. Convert string to int to get the answer on the array.
        }
        document.getElementById("div4").appendChild(result);
      }

    document.getElementById("startbtn1").setAttribute("style", "display: none");
    document.getElementById("startbtn2").setAttribute("style", "display: block");
    document.getElementById("welcome2").innerHTML += score + "/" + jsondata.questions.length;
    document.getElementById("welcome2").setAttribute("style", "display: block");

    document.getElementById("div3").setAttribute("style", "display: block");
    document.getElementById("div4").setAttribute("style", "display: block");
}