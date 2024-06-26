var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var qnum = 0;
var score = 0;
var question = "";
var img1 = new Image;
img1.src = "media/demon2.webp";
img1.height = 200;
img1.id = "quizimage";
var answers = [];
var jsondata;
//Load all quiz data from /single-quiz API page
function getJSON() {
    return __awaiter(this, void 0, void 0, function () {
        var queryString, urlParams, query, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryString = window.location.search;
                    urlParams = new URLSearchParams(queryString);
                    query = urlParams.get('filename');
                    return [4 /*yield*/, fetch("/singlequiz-data?filename=".concat(query))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    jsondata = _a.sent();
                    questionUpdate(qnum);
                    document.getElementById("welcome").innerHTML = jsondata.quizname; //Set the title to the quiz name
                    return [2 /*return*/];
            }
        });
    });
}
function ans(a) {
    if (a == '4') {
        var openanswer = (document.getElementById('openquestion').value.toUpperCase());
        answers.push(openanswer);
        qnum++;
        questionUpdate(qnum);
    }
    else {
        answers.push(a);
        qnum++;
        questionUpdate(qnum);
    }
}
var count = 20;
var timer;
function startTimer() {
    timer = setInterval(function () {
        count--;
        document.getElementById("timer").innerHTML = count.toString();
        if (count === 0) {
            clearInterval(timer);
            answers.push("timeout");
            qnum++;
            questionUpdate(qnum);
        }
    }, 1000);
}
var cancel = function () {
    clearInterval(timer);
    count = 20;
};
function questionUpdate(questionNumber) {
    cancel();
    if (qnum == jsondata.questions.length) {
        cancel();
        document.getElementById("ansbtn1").setAttribute("style", "display: none;");
        document.getElementById("ansbtn2").setAttribute("style", "display: none;");
        document.getElementById("ansbtn3").setAttribute("style", "display: none;");
        document.getElementById("ansbtn4").setAttribute("style", "display: none;");
        document.getElementById("resbtn1").setAttribute("style", "display: block;");
        document.getElementById("questionnum").innerHTML = "Einde!";
        document.getElementById("question").innerHTML = "Click op de knop onderaan om je resultaten te zien.";
    }
    else if (!jsondata.questions[questionNumber].question || !jsondata.questions[questionNumber].answers) {
        alert("Error: question data not found!");
        answers.push("ERROR");
        qnum++;
        questionUpdate(qnum);
    }
    else {
        startTimer();
        document.getElementById("question2").setAttribute("style", "opdacity: 0;");
        if (jsondata.questions[questionNumber].image != "no_image") {
            img1.src = jsondata.questions[questionNumber].image;
            document.getElementById("question2").setAttribute("style", "opacity: 1;");
        }
        document.getElementById("questionnum").innerHTML = "Vraag " + (qnum + 1) + "";
        if (jsondata.questions[questionNumber].answers.length == 1) {
            document.getElementById("question").innerHTML = jsondata.questions[questionNumber].question;
            document.getElementById("ansbtn1").setAttribute("style", "display: none;");
            document.getElementById("ansbtn2").setAttribute("style", "display: none;");
            document.getElementById("ansbtn3").setAttribute("style", "display: none;");
            document.getElementById("ansbtn4").setAttribute("style", "display: none;");
            document.getElementById("ansbtn5").setAttribute("style", "display: block;");
            document.getElementById("openquestion").setAttribute("style", "display: block;");
        }
        else {
            document.getElementById("question").innerHTML = jsondata.questions[questionNumber].question;
            document.getElementById("ansbtn1").setAttribute("style", "display: block;");
            document.getElementById("ansbtn2").setAttribute("style", "display: block;");
            document.getElementById("ansbtn3").setAttribute("style", "display: block;");
            document.getElementById("ansbtn4").setAttribute("style", "display: block;");
            document.getElementById("ansbtn1").innerHTML = jsondata.questions[questionNumber].answers['0'];
            document.getElementById("ansbtn2").innerHTML = jsondata.questions[questionNumber].answers['1'];
            document.getElementById("ansbtn3").innerHTML = jsondata.questions[questionNumber].answers['2'];
            document.getElementById("ansbtn4").innerHTML = jsondata.questions[questionNumber].answers['3'];
            document.getElementById("ansbtn5").setAttribute("style", "display: none;");
            document.getElementById("openquestion").setAttribute("style", "display: none;");
        }
    }
}
function start() {
    document.getElementById("div3").setAttribute("style", "display: none;");
    document.getElementById("div4").setAttribute("style", "display: none;");
    document.getElementById("question2").appendChild(img1);
    var elements3 = document.getElementsByClassName('logo');
    for (var i = 0; i < elements3.length; i++) {
        elements3[i].setAttribute("style", "display: none;");
    }
    var elements1 = document.getElementsByClassName('div1');
    for (var i = 0; i < elements1.length; i++) {
        elements1[i].setAttribute("style", "display: block;");
    }
    var elements2 = document.getElementsByClassName('div2');
    for (var i = 0; i < elements2.length; i++) {
        elements2[i].setAttribute("style", "display: block;");
    }
}
//Print out the results
function res() {
    var elements1 = document.getElementsByClassName('div1');
    for (var i = 0; i < elements1.length; i++) {
        elements1[i].setAttribute("style", "display: none");
    }
    var elements2 = document.getElementsByClassName('div2');
    for (var i = 0; i < elements2.length; i++) {
        elements2[i].setAttribute("style", "display: none");
    }
    var score = 0;
    for (var i = 0; i < jsondata.questions.length; i++) {
        var answernum = i + 1;
        var result = document.createElement("h2");
        result.setAttribute("id", "ans" + i.toString());
        result.setAttribute("class", "ans");
        if (answers[i] == jsondata.questions[i].correct) {
            score++;
            result.setAttribute("style", "color: green");
        }
        if (jsondata.questions[i].answers.length == 1) {
            result.innerText = answernum.toString() + ": " + answers[i];
        }
        else {
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
