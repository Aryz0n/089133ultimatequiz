import express from 'express'
import path from "path";
import fs from "fs";
import qs from "qs";
import assert from "assert";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import { dirname } from 'path';
import {json} from "node:stream/consumers";
const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//set public folder as default. Things don't work without this for some reason.
//responsible for the weird path names.
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname,'quiz.html'));
});

app.get('/creator', (req, res) => {
    res.sendFile(path.join(__dirname,'creator.html'));
});

//Receive the json filename and load all quizdata from that file specifically (acts as API)
app.get('/singlequiz-data', (req, res) => {
    const jsonsInDir = fs.readdirSync('public/quizzes').filter(file => file === req.query.filename);
    let quizData;
    jsonsInDir.forEach(file => {
        const fileData = fs.readFileSync(path.join('public/quizzes', file));
        quizData = JSON.parse(fileData.toString());
    });
    res.send(JSON.stringify(quizData));
})

//Get quiznames from all available json files and put them on this page (acts as API).
app.get('/json-data', (req, res) => {
    const jsonsInDir = fs.readdirSync('public/quizzes').filter(file => path.extname(file) === '.json');
    let json = [];
    jsonsInDir.forEach(file => {
        const fileData = fs.readFileSync(path.join('public/quizzes', file));
        const singleQuiz = JSON.parse(fileData.toString());
        json.push({quizname: singleQuiz.quizname});
    });
    res.send(JSON.stringify(json));
});

//Get json filename based on which quiz the user chose on the index page.
app.get('/quiz-data', (req, res) => {
    const jsonsInDir = fs.readdirSync('public/quizzes').filter(file => path.extname(file) === '.json');
    let filename;
    jsonsInDir.forEach(file => {
        const fileData = fs.readFileSync(path.join('public/quizzes', file));
        const singleQuiz = JSON.parse(fileData.toString());
        if (singleQuiz.quizname === req.query.quizname) {
            filename = path.basename(file);
        }
    });
    res.send(JSON.stringify(filename));
})

//work in progress. Json file needs to be restructured for it to be readable by the script.
app.post('/savefile', (req, res) => {
    const formData = JSON.stringify(req.body);

    let formData2 = JSON.stringify(qs.parse('questions[][question]=q1&questions[][image]=no_image')); //https://www.npmjs.com/package/qs


    fs.writeFile("./public/quizzes/test.json", formData, 'utf8', function(err) {
        if (err) {
            console.log(err);
        }
    });

    fs.writeFile("./public/quizzes/test2.json", formData2, 'utf8', function(err) { //https://www.npmjs.com/package/qs
        if (err) {
            console.log(err);
        }
    });
    res.send('ok');
});


app.listen(port, () => {
    console.log(`Server.js listening on port ${port}`)
})