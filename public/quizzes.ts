//This will run when page is loaded.
//Runs getJSON function and once that one is done, runs getQuizzes
document.addEventListener("DOMContentLoaded", () => {
    getJSON().then((json) => getQuizzes(json)).catch(error => console.log(error));
}, false);

//All quiz files are stored as API in ./json-data, this function gets it from there.
async function getJSON() {
    try {
        const response = await fetch("./json-data");
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function getQuestions(quizname) {
    try {
        const response = await fetch(`./quiz-data?quizname=${quizname}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function loadQuiz(questions) {
    document.location.href = `./quiz?filename=${questions}`;
}

//Runs after getJSON.
function getQuizzes(jsondata) {
    if (jsondata && jsondata.length > 0) { //check to see if data is present

        //loop through all json data and obtain quiz names. Create a div for each quizname found.
        for (let i = 0; i < jsondata.length; i++) {
            const newdiv = document.createElement("div");
            const para = document.createElement("h2");
            const button = document.createElement("button");
            newdiv.className = "quizdiv";
            para.className = "quizname";
            button.className = "playbutton";
            para.innerHTML = jsondata[i].quizname;
            button.innerHTML = "Play";
            button.addEventListener("click", function () {
                // fetch request with quizname to: /quiz-data
                getQuestions(jsondata[i].quizname).then((questions) => loadQuiz(questions)).catch(error => console.log(error));
            })
            document.body.appendChild(newdiv);
            newdiv.appendChild(para);
            newdiv.appendChild(button);
        }
    }
}