const http = require("node:http");
const fs = require("node:fs");
var requests = require("requests");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const homeFile = fs.readFileSync("home.html", "utf-8");  // does not need buffer data therefore utf-8
const replaceVal = (tempVal, orgVal) => {

    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%humidity%}", orgVal.main.humidity);
    temperature = temperature.replace("{%windSpeed%}", orgVal.wind.speed);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    // temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

    return temperature;
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "\\home.html");
});


app.post("/", (req, res) => {

    const city = req.body.q;

    requests(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=63c0909d3b42f222c4c6fb4c8ef8277d&units=metric`)
        .on('data', (chunk) => {
            const objData = JSON.parse(chunk);   //JSON converting
            const arrData = [objData];  // converting Json to array or array of an object 
            // console.log(arrData[0].main.temp);

            //val is to 
            const realTimeData = arrData.map((val) => replaceVal(homeFile, val))
                .join("");

            res.write(realTimeData);
            // console.log(realTimeData);
        })
        .on('end', (err) => {
            if (err) return console.log('connection closed due to errors', err);

            // console.log('end');

            res.end();
        });

});

app.listen(1200, () => {
    console.log("Serving at 1200");
})