const express = require('express');
const bodyParser = require('body-parser');
const jsonFile = require('jsonfile');


const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/layouts.json', (req, res) => {
    jsonFile.readFile("./server/layouts.json", function(err, obj) {
        res.json(obj);
    });
});

app.post('/layouts.json', (req, res) => {
    jsonFile.writeFile("./server/layouts.json", req.body, function (err) {
        if (err) {
            return console.log(err);
        }
        res.json({status: 'ok'});
    });
});

app.listen(3001, () => console.log('Example app listening on port 3001!'));